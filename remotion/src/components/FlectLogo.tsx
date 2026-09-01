import { COLORS, fontDisplay } from "../theme";

const PATH_LENGTH = 94;

export const FlectMark: React.FC<{ size?: number; draw?: number; color?: string }> = ({
  size = 48,
  draw = 1,
  color = COLORS.blue,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M14 72 L44 72 L86 24"
      stroke={color}
      strokeWidth={15}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeDasharray={PATH_LENGTH}
      strokeDashoffset={PATH_LENGTH * (1 - draw)}
    />
  </svg>
);

export const FlectLogo: React.FC<{
  size?: number;
  draw?: number;
  wordOpacity?: number;
  color?: string;
  markColor?: string;
}> = ({ size = 48, draw = 1, wordOpacity = 1, color = COLORS.white, markColor = COLORS.blue }) => (
  <div style={{ display: "flex", alignItems: "center", gap: size * 0.25 }}>
    <FlectMark size={size} draw={draw} color={markColor} />
    <span
      style={{
        fontFamily: fontDisplay,
        fontWeight: 800,
        fontSize: size * 1.05,
        letterSpacing: "-0.03em",
        color,
        opacity: wordOpacity,
        lineHeight: 1,
      }}
    >
      Flect
    </span>
  </div>
);
