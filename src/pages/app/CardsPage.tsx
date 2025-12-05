import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Pencil, Trash2, CreditCard, Settings } from "lucide-react";
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
import { useCards } from "@/hooks/useCards";
import { useDrivers } from "@/hooks/useDrivers";
import { useVehicles } from "@/hooks/useVehicles";
import type { Database } from "@/integrations/supabase/types";

type Card = Database["public"]["Tables"]["cards"]["Row"];

const cardSchema = z.object({
  card_number: z.string().min(1, "Le numéro de carte est requis"),
  driver_id: z.string().optional(),
  vehicle_id: z.string().optional(),
  daily_limit: z.coerce.number().min(0).default(500),
  monthly_limit: z.coerce.number().min(0).default(5000),
  is_active: z.boolean().default(true),
});

type CardFormData = z.infer<typeof cardSchema>;

export default function CardsPage() {
  const navigate = useNavigate();
  const { cards, isLoading, createCard, updateCard, deleteCard } = useCards();
  const { drivers } = useDrivers();
  const { vehicles } = useVehicles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  const form = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      card_number: "",
      driver_id: "",
      vehicle_id: "",
      daily_limit: 500,
      monthly_limit: 5000,
      is_active: true,
    },
  });

  const openCreateDialog = () => {
    setEditingCard(null);
    form.reset({
      card_number: "",
      driver_id: "",
      vehicle_id: "",
      daily_limit: 500,
      monthly_limit: 5000,
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (card: Card) => {
    setEditingCard(card);
    form.reset({
      card_number: card.card_number,
      driver_id: card.driver_id || "",
      vehicle_id: card.vehicle_id || "",
      daily_limit: Number(card.daily_limit) || 500,
      monthly_limit: Number(card.monthly_limit) || 5000,
      is_active: card.is_active ?? true,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: CardFormData) => {
    const cardData = {
      card_number: data.card_number,
      driver_id: data.driver_id === "none" ? null : data.driver_id || null,
      vehicle_id: data.vehicle_id === "none" ? null : data.vehicle_id || null,
      daily_limit: data.daily_limit,
      monthly_limit: data.monthly_limit,
      is_active: data.is_active,
    };

    if (editingCard) {
      await updateCard.mutateAsync({ id: editingCard.id, ...cardData });
    } else {
      await createCard.mutateAsync(cardData);
    }
    setIsDialogOpen(false);
    form.reset();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) {
      await deleteCard.mutateAsync(id);
    }
  };

  const getDriverName = (driverId: string | null) => {
    if (!driverId) return "—";
    const driver = drivers.find((d) => d.id === driverId);
    return driver ? `${driver.first_name} ${driver.last_name}` : "—";
  };

  const getVehiclePlate = (vehicleId: string | null) => {
    if (!vehicleId) return "—";
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    return vehicle?.plate_number || "—";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cartes carburant</h1>
          <p className="text-muted-foreground">Gérez les cartes de votre flotte</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une carte
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCard ? "Modifier la carte" : "Ajouter une carte"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="card_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de carte *</FormLabel>
                      <FormControl>
                        <Input placeholder="4532 **** **** 1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="driver_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chauffeur assigné</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || "none"}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un chauffeur" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">Aucun</SelectItem>
                          {drivers.map((driver) => (
                            <SelectItem key={driver.id} value={driver.id}>
                              {driver.first_name} {driver.last_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vehicle_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Véhicule assigné</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || "none"}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un véhicule" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">Aucun</SelectItem>
                          {vehicles.map((vehicle) => (
                            <SelectItem key={vehicle.id} value={vehicle.id}>
                              {vehicle.plate_number} - {vehicle.brand} {vehicle.model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="daily_limit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Limite journalière (MAD)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="monthly_limit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Limite mensuelle (MAD)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={createCard.isPending || updateCard.isPending}>
                    {editingCard ? "Enregistrer" : "Ajouter"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : cards.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucune carte</h3>
          <p className="text-muted-foreground mb-4">
            Commencez par ajouter des cartes carburant pour votre flotte.
          </p>
          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une carte
          </Button>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Carte</TableHead>
                <TableHead>Chauffeur</TableHead>
                <TableHead>Véhicule</TableHead>
                <TableHead>Limite jour</TableHead>
                <TableHead>Limite mois</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell className="font-medium font-mono">{card.card_number}</TableCell>
                  <TableCell>{getDriverName(card.driver_id)}</TableCell>
                  <TableCell>{getVehiclePlate(card.vehicle_id)}</TableCell>
                  <TableCell>{Number(card.daily_limit).toLocaleString()} MAD</TableCell>
                  <TableCell>{Number(card.monthly_limit).toLocaleString()} MAD</TableCell>
                  <TableCell>
                    <Badge variant={card.is_active ? "default" : "secondary"}>
                      {card.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/app/cards/${card.id}`)}
                      title="Configurer"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(card)}
                      title="Modifier"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(card.id)}
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
