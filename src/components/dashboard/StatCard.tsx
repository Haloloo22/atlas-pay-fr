import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  href?: string;
  trend?: number;
  trendLabel?: string;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, href, trend, trendLabel, className }: StatCardProps) {
  const content = (
    <div className={cn(
      "bg-card border border-border rounded-2xl p-6 transition-all duration-200",
      href && "hover:border-primary/50 hover:shadow-lg cursor-pointer group",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {trend !== undefined && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            trend >= 0 ? "text-green-600 bg-green-500/10" : "text-red-600 bg-red-500/10"
          )}>
            {trend >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{trend >= 0 ? "+" : ""}{trend.toFixed(1)}%</span>
          </div>
        )}
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{title}</p>
      {trendLabel && (
        <p className="text-xs text-muted-foreground mt-1">{trendLabel}</p>
      )}
    </div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
}
