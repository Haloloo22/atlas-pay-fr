import { cn } from "@/lib/utils";

interface TransactionToastProps {
  logo: string;
  station: string;
  amount: number;
  time: string;
  status: "accepted" | "declined";
  className?: string;
  style?: React.CSSProperties;
}

const TransactionToast = ({ logo, station, amount, time, status, className, style }: TransactionToastProps) => {
  const declined = status === "declined";
  return (
    <div
      style={style}
      className={cn(
        "flex items-center gap-3 rounded-2xl bg-background border border-border p-2.5 pr-5 shadow-[0_12px_40px_rgba(13,14,12,0.10)]",
        className
      )}
    >
      <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center shrink-0">
        <img src={logo} alt={`Logo ${station}`} className="w-9 h-9 object-contain" />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-foreground text-base leading-tight">{station}</span>
          <span
            className={cn(
              "text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap",
              declined ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"
            )}
          >
            {declined ? "Transaction refusée" : "Acceptée"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground tabular-nums whitespace-nowrap">
          {amount.toLocaleString("fr-FR", { minimumFractionDigits: amount % 1 ? 1 : 0 })} MAD
          <span className="mx-1.5 text-border">•</span>
          {time}
        </p>
      </div>
    </div>
  );
};

export default TransactionToast;
