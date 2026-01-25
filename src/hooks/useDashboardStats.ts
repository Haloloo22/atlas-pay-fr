import { useMemo } from "react";
import { useTransactions, TransactionWithDetails } from "./useTransactions";
import { useVehicles } from "./useVehicles";
import { useDrivers } from "./useDrivers";
import { useCards } from "./useCards";
import { useAlerts } from "./useAlerts";
import { startOfMonth, subMonths, isWithinInterval, format, subDays, startOfDay, isAfter } from "date-fns";
import { DateRangeOption, getDateRangeFromOption } from "@/components/dashboard/DateRangeFilter";

export interface DashboardStats {
  // Monthly comparison
  thisMonthTotal: number;
  lastMonthTotal: number;
  monthlyChange: number;
  
  // Counts
  activeCards: number;
  totalCards: number;
  unreadAlerts: number;
  
  // Aggregations
  spendingByStation: { name: string; amount: number }[];
  spendingByVehicle: { id: string; plate: string; amount: number }[];
  spendingByDriver: { id: string; name: string; amount: number }[];
  spendingByFuelType: { type: string; amount: number }[];
  
  // Chart data (last 6 months)
  monthlySpending: { month: string; amount: number }[];
  
  // Daily spending (last 7 days)
  dailySpending: { day: string; amount: number }[];
  
  // Averages
  averagePerTransaction: number;
  totalLiters: number;
  averagePricePerLiter: number;
  
  // Recent
  recentTransactions: TransactionWithDetails[];
  
  // Filtered totals
  filteredTotal: number;
  filteredLiters: number;
  filteredTransactionCount: number;
}

export function useDashboardStats(dateRange: DateRangeOption = "6m") {
  const { transactions, isLoading: transactionsLoading, totalAmount, totalLiters } = useTransactions();
  const { vehicles, isLoading: vehiclesLoading } = useVehicles();
  const { drivers, isLoading: driversLoading } = useDrivers();
  const { cards, isLoading: cardsLoading } = useCards();
  const { alerts, unreadCount, isLoading: alertsLoading } = useAlerts();

  const stats = useMemo<DashboardStats>(() => {
    const now = new Date();
    const thisMonthStart = startOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthEnd = startOfMonth(now);
    
    // Get date range for filtering
    const { start: rangeStart } = getDateRangeFromOption(dateRange);
    
    // Filter transactions by date range
    const filteredTransactions = transactions.filter((tx) => {
      const txDate = new Date(tx.transaction_date);
      return isAfter(txDate, rangeStart);
    });

    // This month vs last month (always calculated from all transactions)
    const thisMonthTxs = transactions.filter((tx) => {
      const txDate = new Date(tx.transaction_date);
      return txDate >= thisMonthStart;
    });
    const lastMonthTxs = transactions.filter((tx) => {
      const txDate = new Date(tx.transaction_date);
      return isWithinInterval(txDate, { start: lastMonthStart, end: lastMonthEnd });
    });

    const thisMonthTotal = thisMonthTxs.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
    const lastMonthTotal = lastMonthTxs.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
    const monthlyChange = lastMonthTotal > 0 ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 : 0;
    
    // Filtered totals
    const filteredTotal = filteredTransactions.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
    const filteredLiters = filteredTransactions.reduce((sum, tx) => sum + Number(tx.liters || 0), 0);

    // Spending by station (use filtered transactions)
    const stationMap = new Map<string, number>();
    filteredTransactions.forEach((tx) => {
      const stationName = tx.station_brand || tx.station_name || "Autre";
      stationMap.set(stationName, (stationMap.get(stationName) || 0) + Number(tx.amount || 0));
    });
    const spendingByStation = Array.from(stationMap.entries())
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    // Spending by vehicle (use filtered transactions)
    const vehicleMap = new Map<string, number>();
    filteredTransactions.forEach((tx) => {
      if (tx.card?.vehicle_id) {
        vehicleMap.set(tx.card.vehicle_id, (vehicleMap.get(tx.card.vehicle_id) || 0) + Number(tx.amount || 0));
      }
    });
    const spendingByVehicle = Array.from(vehicleMap.entries())
      .map(([id, amount]) => {
        const vehicle = vehicles.find((v) => v.id === id);
        return { id, plate: vehicle?.plate_number || "Inconnu", amount };
      })
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    // Spending by driver (use filtered transactions)
    const driverMap = new Map<string, number>();
    filteredTransactions.forEach((tx) => {
      if (tx.card?.driver_id) {
        driverMap.set(tx.card.driver_id, (driverMap.get(tx.card.driver_id) || 0) + Number(tx.amount || 0));
      }
    });
    const spendingByDriver = Array.from(driverMap.entries())
      .map(([id, amount]) => {
        const driver = drivers.find((d) => d.id === id);
        return { id, name: driver ? `${driver.first_name} ${driver.last_name}` : "Inconnu", amount };
      })
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    // Spending by fuel type (use filtered transactions)
    const fuelMap = new Map<string, number>();
    filteredTransactions.forEach((tx) => {
      const fuelType = tx.fuel_type || "Autre";
      fuelMap.set(fuelType, (fuelMap.get(fuelType) || 0) + Number(tx.amount || 0));
    });
    const spendingByFuelType = Array.from(fuelMap.entries())
      .map(([type, amount]) => ({ type, amount }))
      .sort((a, b) => b.amount - a.amount);

    // Monthly spending (based on date range)
    const monthlySpending: { month: string; amount: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i));
      const monthEnd = i === 0 ? now : startOfMonth(subMonths(now, i - 1));
      // Only include months within the date range
      if (monthStart >= rangeStart) {
        const monthTxs = transactions.filter((tx) => {
          const txDate = new Date(tx.transaction_date);
          return isWithinInterval(txDate, { start: monthStart, end: monthEnd });
        });
        const monthTotal = monthTxs.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
        monthlySpending.push({
          month: format(monthStart, "MMM"),
          amount: monthTotal,
        });
      }
    }

    // Daily spending (last 7 days)
    const dailySpending: { day: string; amount: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const dayStart = startOfDay(subDays(now, i));
      const dayEnd = startOfDay(subDays(now, i - 1));
      const dayTxs = transactions.filter((tx) => {
        const txDate = new Date(tx.transaction_date);
        return i === 0 ? txDate >= dayStart : isWithinInterval(txDate, { start: dayStart, end: dayEnd });
      });
      const dayTotal = dayTxs.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
      dailySpending.push({
        day: format(dayStart, "EEE"),
        amount: dayTotal,
      });
    }

    // Averages (use filtered transactions)
    const averagePerTransaction = filteredTransactions.length > 0 ? filteredTotal / filteredTransactions.length : 0;
    const averagePricePerLiter = filteredLiters > 0 ? filteredTotal / filteredLiters : 0;

    return {
      thisMonthTotal,
      lastMonthTotal,
      monthlyChange,
      activeCards: cards.filter((c) => c.is_active).length,
      totalCards: cards.length,
      unreadAlerts: unreadCount,
      spendingByStation,
      spendingByVehicle,
      spendingByDriver,
      spendingByFuelType,
      monthlySpending,
      dailySpending,
      averagePerTransaction,
      totalLiters: filteredLiters,
      averagePricePerLiter,
      recentTransactions: transactions.slice(0, 5),
      filteredTotal,
      filteredLiters,
      filteredTransactionCount: filteredTransactions.length,
    };
  }, [transactions, vehicles, drivers, cards, unreadCount, totalAmount, totalLiters, dateRange]);

  return {
    stats,
    alerts,
    isLoading: transactionsLoading || vehiclesLoading || driversLoading || cardsLoading || alertsLoading,
  };
}