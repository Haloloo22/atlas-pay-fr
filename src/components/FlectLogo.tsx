import { cn } from "@/lib/utils";

interface FlectLogoProps {
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
}

export const FlectMark = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={cn("h-8 w-8", className)}
    role="img"
    aria-label="Flect"
  >
    <path
      d="M14 72 L44 72 L86 24"
      stroke="currentColor"
      strokeWidth={15}
      strokeLinecap="butt"
      strokeLinejoin="miter"
    />
  </svg>
);

export const FlectLogo = ({ className, showWordmark = true, wordmarkClassName }: FlectLogoProps) => (
  <span className={cn("inline-flex items-center gap-2", className)}>
    <FlectMark className="text-primary" />
    {showWordmark && (
      <span className={cn("font-display font-extrabold tracking-tight text-foreground", wordmarkClassName)}>
        Flect
      </span>
    )}
  </span>
);

export default FlectLogo;
