import { cn } from '@/lib/utils';

const stations = [
  { 
    name: 'Total', 
    colors: 'from-red-600 to-red-500',
    textColor: 'text-white'
  },
  { 
    name: 'Shell', 
    colors: 'from-yellow-400 to-yellow-500',
    textColor: 'text-red-600'
  },
  { 
    name: 'Afriquia', 
    colors: 'from-green-600 to-green-500',
    textColor: 'text-white'
  },
  { 
    name: 'Winxo', 
    colors: 'from-blue-600 to-blue-500',
    textColor: 'text-white'
  },
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
            "flex-shrink-0 px-6 py-3 rounded-xl bg-gradient-to-br shadow-lg",
            "transform hover:scale-110 transition-transform duration-300 cursor-default",
            station.colors
          )}
        >
          <span className={cn("text-lg font-bold tracking-tight", station.textColor)}>
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
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
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
