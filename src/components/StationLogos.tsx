import { cn } from '@/lib/utils';
import shellLogo from '@/assets/stations/shell.png.asset.json';
import totalLogo from '@/assets/stations/total.png.asset.json';
import afriquiaLogo from '@/assets/stations/afriquia.png.asset.json';
import winxoLogo from '@/assets/stations/winxo.png.asset.json';

export const stations = [
  { name: 'TotalEnergies', logo: totalLogo.url, wide: true },
  { name: 'Shell', logo: shellLogo.url, wide: false },
  { name: 'Afriquia', logo: afriquiaLogo.url, wide: false },
  { name: 'Winxo', logo: winxoLogo.url, wide: false },
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
            "flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-xl bg-background border border-border",
            "transition-transform duration-200 cursor-default"
          )}
        >
          <img
            src={station.logo}
            alt={`Logo ${station.name}`}
            loading="lazy"
            className={cn("h-8 w-auto object-contain", station.wide ? "max-w-[140px]" : "max-w-[40px]")}
          />
          {!station.wide && (
            <span className="text-base font-display font-bold tracking-tight text-ink">
              {station.name}
            </span>
          )}
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
