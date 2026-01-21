import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Pencil, Trash2, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { usePolicies, Policy } from "@/hooks/usePolicies";
import { useCards } from "@/hooks/useCards";
import { TableSkeleton } from "@/components/TableSkeleton";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const policySchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
});

type PolicyFormData = z.infer<typeof policySchema>;

export default function PoliciesPage() {
  const navigate = useNavigate();
  const { policies, isLoading, createPolicy, deletePolicy } = usePolicies();
  const { cards } = useCards();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; linkedCards: number } | null>(null);

  const form = useForm<PolicyFormData>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const openCreateDialog = () => {
    form.reset({ name: "", description: "" });
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: PolicyFormData) => {
    await createPolicy.mutateAsync({
      name: data.name,
      description: data.description || null,
      is_default: false,
      per_transaction_min: 0,
      per_transaction_limit: 200,
      daily_limit: 500,
      weekly_limit: 2000,
      monthly_limit: 5000,
      limit_type: "hard",
      allowed_fuel_types: ["diesel", "essence", "gasoil"],
      block_non_fuel_mcc: true,
      allow_shop_purchases: false,
      shop_max_amount: 50,
      allowed_hours_start: "06:00",
      allowed_hours_end: "22:00",
      allowed_days: [1, 2, 3, 4, 5, 6, 7],
      geofencing_enabled: false,
      geofencing_regions: [],
      max_fills_per_day: 2,
      max_tank_capacity_mad: 800,
      enforce_vehicle_fuel_type: true,
    });
    setIsDialogOpen(false);
    form.reset();
  };

  const handleDeleteClick = (id: string) => {
    const linkedCards = cards.filter((c) => c.policy_id === id).length;
    setDeleteTarget({ id, linkedCards });
  };

  const handleDelete = async () => {
    if (deleteTarget) {
      await deletePolicy.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const getCardCount = (policyId: string) => {
    return cards.filter((c) => c.policy_id === policyId).length;
  };

  const getActiveRulesCount = (policy: Policy) => {
    let count = 0;
    if (policy.per_transaction_limit && policy.per_transaction_limit > 0) count++;
    if (policy.daily_limit && policy.daily_limit > 0) count++;
    if (policy.weekly_limit && policy.weekly_limit > 0) count++;
    if (policy.monthly_limit && policy.monthly_limit > 0) count++;
    if (policy.block_non_fuel_mcc) count++;
    if (policy.geofencing_enabled) count++;
    if (policy.allowed_hours_start && policy.allowed_hours_end) count++;
    if (policy.max_fills_per_day && policy.max_fills_per_day > 0) count++;
    return count;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Politiques</h1>
          <p className="text-muted-foreground">
            Créez des règles réutilisables à appliquer sur vos cartes
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle politique
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer une politique</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de la politique *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Standard, Premium, Livreurs..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Description optionnelle de cette politique..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={createPolicy.isPending}>
                    Créer
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <TableSkeleton columns={5} rows={3} />
      ) : policies.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucune politique</h3>
          <p className="text-muted-foreground mb-4">
            Créez votre première politique pour définir des règles d'utilisation des cartes.
          </p>
          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle politique
          </Button>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Règles actives</TableHead>
                <TableHead>Cartes liées</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      {policy.name}
                      {policy.is_default && (
                        <Badge variant="secondary" className="text-xs">Par défaut</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">
                    {policy.description || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{getActiveRulesCount(policy)} règles</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                      <span>{getCardCount(policy.id)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/app/policies/${policy.id}`)}
                      title="Configurer"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(policy.id)}
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

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Supprimer la politique"
        description={
          deleteTarget?.linkedCards && deleteTarget.linkedCards > 0
            ? `Cette politique est liée à ${deleteTarget.linkedCards} carte(s). Êtes-vous sûr de vouloir la supprimer ?`
            : "Êtes-vous sûr de vouloir supprimer cette politique ? Cette action est irréversible."
        }
        confirmLabel="Supprimer"
        onConfirm={handleDelete}
        variant="destructive"
      />
    </div>
  );
}
