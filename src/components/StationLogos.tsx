import { cn } from '@/lib/utils';

const stations = [
  { name: 'TotalEnergies' },
  { name: 'Shell' },
  { name: 'Afriquia' },
  { name: 'Winxo' },
  { name: 'Petrom' },
];

interface StationLogosProps {
  variant?: 'static' | 'marquee';
  className?: string;
}

const StationLogos = ({ variant = 'marquee', className }: StationLogosProps) => {
  const LogoItems = () => (
    <>
      {stations.map((station, index) => (
        <div
          key={index}
          className={cn(
            "flex-shrink-0 px-6 py-3 rounded-xl bg-background border border-border",
            "transition-transform duration-200 cursor-default"
          )}
        >
          <span className="text-lg font-display font-bold tracking-tight text-ink">
            {station.name}
          </span>
        </div>
      ))}
    </>
  );

  if (variant === 'static') {
    return (
      <div className={cn("flex flex-wrap items-center justify-center gap-4", className)}>
        <LogoItems />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20  z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20  z-10 pointer-events-none" />
      
      {/* Marquee container */}
      <div className="flex gap-8 animate-marquee">
        <div className="flex gap-8 shrink-0">
          <LogoItems />
        </div>
        <div className="flex gap-8 shrink-0">
          <LogoItems />
        </div>
        <div className="flex gap-8 shrink-0">
          <LogoItems />
        </div>
      </div>
    </div>
  );
};

export default StationLogos;
