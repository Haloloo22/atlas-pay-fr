import { useState, useEffect } from "react";
import { Wallet, AlertTriangle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface CardLimitsTabProps {
  card: {
    per_transaction_limit: number;
    per_transaction_min: number;
    daily_limit: number;
    weekly_limit: number;
    monthly_limit: number;
    limit_type: string;
  };
  onSave: (limits: {
    per_transaction_limit: number;
    per_transaction_min: number;
    daily_limit: number;
    weekly_limit: number;
    monthly_limit: number;
    limit_type: string;
  }) => void;
  isPending?: boolean;
}

export function CardLimitsTab({ card, onSave, isPending }: CardLimitsTabProps) {
  const [limits, setLimits] = useState({
    per_transaction_limit: Number(card.per_transaction_limit) || 200,
    per_transaction_min: Number(card.per_transaction_min) || 0,
    daily_limit: Number(card.daily_limit) || 500,
    weekly_limit: Number(card.weekly_limit) || 2000,
    monthly_limit: Number(card.monthly_limit) || 5000,
    limit_type: card.limit_type || "hard",
  });

  useEffect(() => {
    setLimits({
      per_transaction_limit: Number(card.per_transaction_limit) || 200,
      per_transaction_min: Number(card.per_transaction_min) || 0,
      daily_limit: Number(card.daily_limit) || 500,
      weekly_limit: Number(card.weekly_limit) || 2000,
      monthly_limit: Number(card.monthly_limit) || 5000,
      limit_type: card.limit_type || "hard",
    });
  }, [card]);

  const handleSave = () => {
    onSave(limits);
  };

  const hasChanges =
    limits.per_transaction_limit !== Number(card.per_transaction_limit) ||
    limits.per_transaction_min !== Number(card.per_transaction_min) ||
    limits.daily_limit !== Number(card.daily_limit) ||
    limits.weekly_limit !== Number(card.weekly_limit) ||
    limits.monthly_limit !== Number(card.monthly_limit) ||
    limits.limit_type !== (card.limit_type || "hard");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Limites de dépenses
          </CardTitle>
          <CardDescription>
            Définissez les plafonds de dépenses pour cette carte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Hard/Soft limit toggle */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              {limits.limit_type === "hard" ? (
                <ShieldCheck className="h-5 w-5 text-destructive" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              )}
              <div className="space-y-0.5">
                <Label className="text-base font-medium">Type de limite</Label>
                <p className="text-sm text-muted-foreground">
                  {limits.limit_type === "hard"
                    ? "Hard limit : Bloque la transaction si dépassée"
                    : "Soft limit : Alerte uniquement, transaction autorisée"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={limits.limit_type === "hard" ? "destructive" : "secondary"}>
                {limits.limit_type === "hard" ? "Blocage" : "Alerte"}
              </Badge>
              <Switch
                checked={limits.limit_type === "hard"}
                onCheckedChange={(checked) =>
                  setLimits((l) => ({ ...l, limit_type: checked ? "hard" : "soft" }))
                }
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Min par transaction */}
            <div className="space-y-3">
              <Label>Montant minimum par transaction</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[limits.per_transaction_min]}
                  onValueChange={([val]) =>
                    setLimits((l) => ({ ...l, per_transaction_min: val }))
                  }
                  max={200}
                  step={10}
                  className="flex-1"
                />
                <div className="w-28 flex items-center gap-1">
                  <Input
                    type="number"
                    value={limits.per_transaction_min}
                    onChange={(e) =>
                      setLimits((l) => ({
                        ...l,
                        per_transaction_min: Number(e.target.value),
                      }))
                    }
                    className="text-right"
                  />
                  <span className="text-muted-foreground text-sm">MAD</span>
                </div>
              </div>
            </div>

            {/* Max par transaction */}
            <div className="space-y-3">
              <Label>Montant maximum par transaction</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[limits.per_transaction_limit]}
                  onValueChange={([val]) =>
                    setLimits((l) => ({ ...l, per_transaction_limit: val }))
                  }
                  max={2000}
                  step={50}
                  className="flex-1"
                />
                <div className="w-28 flex items-center gap-1">
                  <Input
                    type="number"
                    value={limits.per_transaction_limit}
                    onChange={(e) =>
                      setLimits((l) => ({
                        ...l,
                        per_transaction_limit: Number(e.target.value),
                      }))
                    }
                    className="text-right"
                  />
                  <span className="text-muted-foreground text-sm">MAD</span>
                </div>
              </div>
            </div>

            {/* Journalière */}
            <div className="space-y-3">
              <Label>Limite journalière</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[limits.daily_limit]}
                  onValueChange={([val]) =>
                    setLimits((l) => ({ ...l, daily_limit: val }))
                  }
                  max={5000}
                  step={100}
                  className="flex-1"
                />
                <div className="w-28 flex items-center gap-1">
                  <Input
                    type="number"
                    value={limits.daily_limit}
                    onChange={(e) =>
                      setLimits((l) => ({ ...l, daily_limit: Number(e.target.value) }))
                    }
                    className="text-right"
                  />
                  <span className="text-muted-foreground text-sm">MAD</span>
                </div>
              </div>
            </div>

            {/* Hebdomadaire */}
            <div className="space-y-3">
              <Label>Limite hebdomadaire</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[limits.weekly_limit]}
                  onValueChange={([val]) =>
                    setLimits((l) => ({ ...l, weekly_limit: val }))
                  }
                  max={20000}
                  step={500}
                  className="flex-1"
                />
                <div className="w-28 flex items-center gap-1">
                  <Input
                    type="number"
                    value={limits.weekly_limit}
                    onChange={(e) =>
                      setLimits((l) => ({ ...l, weekly_limit: Number(e.target.value) }))
                    }
                    className="text-right"
                  />
                  <span className="text-muted-foreground text-sm">MAD</span>
                </div>
              </div>
            </div>

            {/* Mensuelle */}
            <div className="space-y-3 md:col-span-2">
              <Label>Limite mensuelle</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[limits.monthly_limit]}
                  onValueChange={([val]) =>
                    setLimits((l) => ({ ...l, monthly_limit: val }))
                  }
                  max={50000}
                  step={1000}
                  className="flex-1"
                />
                <div className="w-28 flex items-center gap-1">
                  <Input
                    type="number"
                    value={limits.monthly_limit}
                    onChange={(e) =>
                      setLimits((l) => ({ ...l, monthly_limit: Number(e.target.value) }))
                    }
                    className="text-right"
                  />
                  <span className="text-muted-foreground text-sm">MAD</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={!hasChanges || isPending}>
              {isPending ? "Enregistrement..." : "Enregistrer les limites"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
