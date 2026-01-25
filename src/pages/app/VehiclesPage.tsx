import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Pencil, Trash2, Car, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Badge } from "@/components/ui/badge";
import { useVehicles } from "@/hooks/useVehicles";
import { usePagination } from "@/hooks/usePagination";
import { DataTablePagination } from "@/components/DataTablePagination";
import { TableSkeleton } from "@/components/TableSkeleton";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { exportToCsv, vehicleColumns } from "@/utils/exportCsv";
import type { Database } from "@/integrations/supabase/types";

type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];

// Moroccan plate number format: 12345-A-67 or similar patterns
const plateNumberRegex = /^[0-9]{1,5}-[A-Z]{1,3}-[0-9]{1,3}$|^[0-9]{1,6}[A-Z]{1,3}[0-9]{1,2}$/i;

const vehicleSchema = z.object({
  plate_number: z
    .string()
    .min(1, "L'immatriculation est requise")
    .refine((val) => plateNumberRegex.test(val.replace(/\s/g, "")), {
      message: "Format invalide (ex: 12345-A-67)",
    }),
  brand: z.string().optional(),
  model: z.string().optional(),
  vehicle_type: z.enum(["car", "truck", "van", "motorcycle"]).default("car"),
  fuel_type: z.string().optional(),
  is_active: z.boolean().default(true),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

const vehicleTypeLabels = {
  car: "Voiture",
  truck: "Camion",
  van: "Utilitaire",
  motorcycle: "Moto",
};

export default function VehiclesPage() {
  const { vehicles, isLoading, createVehicle, updateVehicle, deleteVehicle } = useVehicles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      plate_number: "",
      brand: "",
      model: "",
      vehicle_type: "car",
      fuel_type: "",
      is_active: true,
    },
  });

  // Filter vehicles
  const filteredVehicles = useMemo(() => {
    if (!searchTerm) return vehicles;
    const term = searchTerm.toLowerCase();
    return vehicles.filter(
      (v) =>
        v.plate_number.toLowerCase().includes(term) ||
        v.brand?.toLowerCase().includes(term) ||
        v.model?.toLowerCase().includes(term)
    );
  }, [vehicles, searchTerm]);

  // Pagination
  const pagination = usePagination(filteredVehicles, { pageSize: 10 });

  const openCreateDialog = () => {
    setEditingVehicle(null);
    form.reset({
      plate_number: "",
      brand: "",
      model: "",
      vehicle_type: "car",
      fuel_type: "",
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    form.reset({
      plate_number: vehicle.plate_number,
      brand: vehicle.brand || "",
      model: vehicle.model || "",
      vehicle_type: vehicle.vehicle_type || "car",
      fuel_type: vehicle.fuel_type || "",
      is_active: vehicle.is_active ?? true,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: VehicleFormData) => {
    const vehicleData = {
      plate_number: data.plate_number,
      brand: data.brand || null,
      model: data.model || null,
      vehicle_type: data.vehicle_type,
      fuel_type: data.fuel_type || null,
      is_active: data.is_active,
    };

    if (editingVehicle) {
      await updateVehicle.mutateAsync({ id: editingVehicle.id, ...vehicleData });
    } else {
      await createVehicle.mutateAsync(vehicleData);
    }
    setIsDialogOpen(false);
    form.reset();
  };

  const handleDelete = async () => {
    if (deleteTarget) {
      await deleteVehicle.mutateAsync(deleteTarget);
      setDeleteTarget(null);
    }
  };

  const handleExport = () => {
    exportToCsv(filteredVehicles, vehicleColumns, "vehicules");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Véhicules</h1>
          <p className="text-muted-foreground">Gérez les véhicules de votre flotte</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} disabled={vehicles.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un véhicule
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingVehicle ? "Modifier le véhicule" : "Ajouter un véhicule"}
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="plate_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Immatriculation *</FormLabel>
                        <FormControl>
                          <Input placeholder="12345-A-67" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marque</FormLabel>
                          <FormControl>
                            <Input placeholder="Toyota" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Modèle</FormLabel>
                          <FormControl>
                            <Input placeholder="Hilux" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="vehicle_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Type de véhicule" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="car">Voiture</SelectItem>
                              <SelectItem value="truck">Camion</SelectItem>
                              <SelectItem value="van">Utilitaire</SelectItem>
                              <SelectItem value="motorcycle">Moto</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fuel_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Carburant</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Type de carburant" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="diesel">Diesel</SelectItem>
                              <SelectItem value="essence">Essence</SelectItem>
                              <SelectItem value="electric">Électrique</SelectItem>
                              <SelectItem value="hybrid">Hybride</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button type="submit" disabled={createVehicle.isPending || updateVehicle.isPending}>
                      {editingVehicle ? "Enregistrer" : "Ajouter"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par immatriculation, marque..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <TableSkeleton columns={6} rows={5} />
      ) : vehicles.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucun véhicule</h3>
          <p className="text-muted-foreground mb-4">
            Commencez par ajouter les véhicules de votre flotte.
          </p>
          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un véhicule
          </Button>
        </div>
      ) : filteredVehicles.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucun résultat</h3>
          <p className="text-muted-foreground">
            Aucun véhicule ne correspond à votre recherche.
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Immatriculation</TableHead>
                <TableHead>Marque / Modèle</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Carburant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagination.paginatedData.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.plate_number}</TableCell>
                  <TableCell>
                    {vehicle.brand && vehicle.model
                      ? `${vehicle.brand} ${vehicle.model}`
                      : vehicle.brand || vehicle.model || "—"}
                  </TableCell>
                  <TableCell>
                    {vehicle.vehicle_type
                      ? vehicleTypeLabels[vehicle.vehicle_type as keyof typeof vehicleTypeLabels]
                      : "—"}
                  </TableCell>
                  <TableCell>{vehicle.fuel_type || "—"}</TableCell>
                  <TableCell>
                    <Badge variant={vehicle.is_active ? "default" : "secondary"}>
                      {vehicle.is_active ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(vehicle)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(vehicle.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DataTablePagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            startIndex={pagination.startIndex}
            endIndex={pagination.endIndex}
            totalItems={filteredVehicles.length}
            onPageChange={pagination.setCurrentPage}
            onFirstPage={pagination.goToFirstPage}
            onLastPage={pagination.goToLastPage}
            onNextPage={pagination.goToNextPage}
            onPreviousPage={pagination.goToPreviousPage}
          />
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Supprimer le véhicule"
        description="Êtes-vous sûr de vouloir supprimer ce véhicule ? Cette action est irréversible."
        confirmLabel="Supprimer"
        onConfirm={handleDelete}
        variant="destructive"
      />
    </div>
  );
}
