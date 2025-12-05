import { useState, useEffect } from "react";
import { Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DAYS_OF_WEEK } from "@/types/card-control";

interface CardScheduleTabProps {
  card: {
    allowed_hours_start: string;
    allowed_hours_end: string;
    allowed_days: number[];
  };
  onSave: (schedule: {
    allowed_hours_start: string;
    allowed_hours_end: string;
    allowed_days: number[];
  }) => void;
  isPending?: boolean;
}

export function CardScheduleTab({ card, onSave, isPending }: CardScheduleTabProps) {
  const [schedule, setSchedule] = useState({
    allowed_hours_start: card.allowed_hours_start || "06:00",
    allowed_hours_end: card.allowed_hours_end || "22:00",
    allowed_days: card.allowed_days || [1, 2, 3, 4, 5, 6, 7],
  });

  useEffect(() => {
    setSchedule({
      allowed_hours_start: card.allowed_hours_start || "06:00",
      allowed_hours_end: card.allowed_hours_end || "22:00",
      allowed_days: card.allowed_days || [1, 2, 3, 4, 5, 6, 7],
    });
  }, [card]);

  const handleDayToggle = (day: number) => {
    setSchedule((prev) => ({
      ...prev,
      allowed_days: prev.allowed_days.includes(day)
        ? prev.allowed_days.filter((d) => d !== day)
        : [...prev.allowed_days, day].sort(),
    }));
  };

  const handleSave = () => {
    onSave(schedule);
  };

  const hasChanges =
    schedule.allowed_hours_start !== card.allowed_hours_start ||
    schedule.allowed_hours_end !== card.allowed_hours_end ||
    JSON.stringify(schedule.allowed_days.sort()) !==
      JSON.stringify((card.allowed_days || []).sort());

  return (
    <div className="space-y-6">
      {/* Heures d'utilisation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Plage horaire autorisée
          </CardTitle>
          <CardDescription>
            Définissez les heures pendant lesquelles la carte peut être utilisée
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Label htmlFor="start-time">De</Label>
              <Input
                id="start-time"
                type="time"
                value={schedule.allowed_hours_start}
                onChange={(e) =>
                  setSchedule((prev) => ({
                    ...prev,
                    allowed_hours_start: e.target.value,
                  }))
                }
                className="w-32"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="end-time">à</Label>
              <Input
                id="end-time"
                type="time"
                value={schedule.allowed_hours_end}
                onChange={(e) =>
                  setSchedule((prev) => ({
                    ...prev,
                    allowed_hours_end: e.target.value,
                  }))
                }
                className="w-32"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Les transactions en dehors de cette plage horaire seront refusées.
          </p>
        </CardContent>
      </Card>

      {/* Jours autorisés */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Jours d'utilisation
          </CardTitle>
          <CardDescription>
            Sélectionnez les jours où la carte peut être utilisée
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = schedule.allowed_days.includes(day.value);
              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => handleDayToggle(day.value)}
                  className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-muted border-border"
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setSchedule((prev) => ({
                  ...prev,
                  allowed_days: [1, 2, 3, 4, 5],
                }))
              }
            >
              Jours ouvrés
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setSchedule((prev) => ({
                  ...prev,
                  allowed_days: [1, 2, 3, 4, 5, 6, 7],
                }))
              }
            >
              Tous les jours
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={!hasChanges || isPending}>
          {isPending ? "Enregistrement..." : "Enregistrer les horaires"}
        </Button>
      </div>
    </div>
  );
}
