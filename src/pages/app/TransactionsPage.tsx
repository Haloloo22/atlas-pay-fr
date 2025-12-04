import { useState, useMemo } from "react";
import { Receipt, Search, Filter, Fuel, MapPin, Calendar } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCards } from "@/hooks/useCards";
import { useVehicles } from "@/hooks/useVehicles";
import { useDrivers } from "@/hooks/useDrivers";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const TransactionsPage = () => {
  const { transactions, isLoading, totalAmount, totalLiters } = useTransactions();
  const { cards } = useCards();
  const { vehicles } = useVehicles();
  const { drivers } = useDrivers();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCard, setFilterCard] = useState<string>("all");
  const [filterFuelType, setFilterFuelType] = useState<string>("all");

  // Get unique fuel types from transactions
  const fuelTypes = useMemo(() => {
    const types = new Set(transactions.map((tx) => tx.fuel_type).filter(Boolean));
    return Array.from(types) as string[];
  }, [transactions]);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        !searchTerm ||
        tx.station_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.station_brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.location?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCard = filterCard === "all" || tx.card_id === filterCard;
      const matchesFuel = filterFuelType === "all" || tx.fuel_type === filterFuelType;

      return matchesSearch && matchesCard && matchesFuel;
    });
  }, [transactions, searchTerm, filterCard, filterFuelType]);

  // Calculate filtered totals
  const filteredTotalAmount = filteredTransactions.reduce(
    (sum, tx) => sum + Number(tx.amount || 0),
    0
  );
  const filteredTotalLiters = filteredTransactions.reduce(
    (sum, tx) => sum + Number(tx.liters || 0),
    0
  );

  // Helper to get vehicle plate
  const getVehiclePlate = (vehicleId: string | null | undefined) => {
    if (!vehicleId) return "-";
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    return vehicle?.plate_number || "-";
  };

  // Helper to get driver name
  const getDriverName = (driverId: string | null | undefined) => {
    if (!driverId) return "-";
    const driver = drivers.find((d) => d.id === driverId);
    return driver ? `${driver.first_name} ${driver.last_name}` : "-";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">
            Historique des transactions carburant
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Total transactions</p>
          <p className="text-2xl font-bold">{filteredTransactions.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Montant total</p>
          <p className="text-2xl font-bold">{filteredTotalAmount.toLocaleString("fr-MA")} MAD</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Litres totaux</p>
          <p className="text-2xl font-bold">{filteredTotalLiters.toLocaleString("fr-MA")} L</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Prix moyen/L</p>
          <p className="text-2xl font-bold">
            {filteredTotalLiters > 0
              ? (filteredTotalAmount / filteredTotalLiters).toFixed(2)
              : "0"}{" "}
            MAD
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par station, lieu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCard} onValueChange={setFilterCard}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Toutes les cartes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les cartes</SelectItem>
            {cards.map((card) => (
              <SelectItem key={card.id} value={card.id}>
                {card.card_number}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterFuelType} onValueChange={setFilterFuelType}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Tous les carburants" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les carburants</SelectItem>
            {fuelTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Transactions table */}
      {filteredTransactions.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <Receipt className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium mb-2">Aucune transaction</h3>
          <p className="text-muted-foreground">
            Les transactions apparaîtront ici une fois effectuées.
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Carte</TableHead>
                <TableHead>Véhicule</TableHead>
                <TableHead>Chauffeur</TableHead>
                <TableHead>Station</TableHead>
                <TableHead>Carburant</TableHead>
                <TableHead className="text-right">Litres</TableHead>
                <TableHead className="text-right">Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {format(new Date(tx.transaction_date), "dd MMM yyyy", {
                          locale: fr,
                        })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {tx.card?.card_number || "-"}
                  </TableCell>
                  <TableCell>{getVehiclePlate(tx.card?.vehicle_id)}</TableCell>
                  <TableCell>{getDriverName(tx.card?.driver_id)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{tx.station_name || "-"}</p>
                      {tx.location && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {tx.location}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {tx.fuel_type && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs">
                        <Fuel className="w-3 h-3" />
                        {tx.fuel_type}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {tx.liters ? `${Number(tx.liters).toLocaleString("fr-MA")} L` : "-"}
                  </TableCell>
                  <TableCell className="text-right font-bold text-primary">
                    {Number(tx.amount).toLocaleString("fr-MA")} MAD
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
