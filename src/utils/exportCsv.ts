import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface ExportColumn<T> {
  key: keyof T | string;
  label: string;
  transform?: (value: any, row: T) => string;
}

export function exportToCsv<T extends Record<string, any>>(
  data: T[],
  columns: ExportColumn<T>[],
  filename: string
): void {
  if (data.length === 0) {
    console.warn("No data to export");
    return;
  }

  // Create header row
  const headers = columns.map((col) => col.label);

  // Create data rows
  const rows = data.map((row) =>
    columns.map((col) => {
      const keys = String(col.key).split(".");
      let value: any = row;
      for (const key of keys) {
        value = value?.[key];
      }
      
      if (col.transform) {
        return escapeCsvValue(col.transform(value, row));
      }
      
      if (value === null || value === undefined) {
        return "";
      }
      
      return escapeCsvValue(String(value));
    })
  );

  // Combine headers and rows
  const csvContent = [
    headers.map(escapeCsvValue).join(";"),
    ...rows.map((row) => row.join(";")),
  ].join("\n");

  // Create and download file with BOM for Excel compatibility
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}_${format(new Date(), "yyyy-MM-dd_HH-mm", { locale: fr })}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeCsvValue(value: string): string {
  // If value contains semicolon, newline, or quote, wrap in quotes
  if (value.includes(";") || value.includes("\n") || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// Pre-defined export configurations for common entities

export const transactionColumns = [
  { key: "transaction_date", label: "Date", transform: (v: string) => format(new Date(v), "dd/MM/yyyy HH:mm", { locale: fr }) },
  { key: "card.card_number", label: "N° Carte" },
  { key: "station_name", label: "Station" },
  { key: "station_brand", label: "Marque Station" },
  { key: "location", label: "Ville" },
  { key: "fuel_type", label: "Carburant" },
  { key: "liters", label: "Litres", transform: (v: number) => v?.toFixed(2) || "" },
  { key: "amount", label: "Montant (MAD)", transform: (v: number) => v?.toFixed(2) || "" },
  { key: "odometer", label: "Kilométrage" },
];

export const vehicleColumns = [
  { key: "plate_number", label: "Immatriculation" },
  { key: "brand", label: "Marque" },
  { key: "model", label: "Modèle" },
  { key: "vehicle_type", label: "Type" },
  { key: "fuel_type", label: "Carburant" },
  { key: "is_active", label: "Statut", transform: (v: boolean) => v ? "Actif" : "Inactif" },
];

export const driverColumns = [
  { key: "first_name", label: "Prénom" },
  { key: "last_name", label: "Nom" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Téléphone" },
  { key: "license_number", label: "N° Permis" },
  { key: "is_active", label: "Statut", transform: (v: boolean) => v ? "Actif" : "Inactif" },
];

export const cardColumns = [
  { key: "card_number", label: "N° Carte" },
  { key: "is_active", label: "Statut", transform: (v: boolean) => v ? "Active" : "Inactive" },
  { key: "daily_limit", label: "Limite Journalière (MAD)" },
  { key: "monthly_limit", label: "Limite Mensuelle (MAD)" },
];
