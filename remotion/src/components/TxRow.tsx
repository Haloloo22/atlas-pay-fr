import { COLORS, fontBody, fontDisplay } from "../theme";

export const CheckIcon: React.FC<{ draw: number; color: string }> = ({ draw, color }) => (
  <svg width={40} height={40} viewBox="0 0 40 40" fill="none">
    <circle cx={20} cy={20} r={18} stroke={color} strokeWidth={2} opacity={0.35} />
    <path
      d="M11 20 L17 26 L29 14"
      stroke={color}
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={26}
      strokeDashoffset={26 * (1 - draw)}
    />
  </svg>
);

export const CrossIcon: React.FC<{ draw: number; color: string }> = ({ draw, color }) => (
  <svg width={40} height={40} viewBox="0 0 40 40" fill="none">
    <circle cx={20} cy={20} r={18} stroke={color} strokeWidth={2} opacity={0.35} />
    <path
      d="M13 13 L27 27"
      stroke={color}
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeDasharray={20}
      strokeDashoffset={20 * (1 - Math.min(1, draw * 2))}
    />
    <path
      d="M27 13 L13 27"
      stroke={color}
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeDasharray={20}
      strokeDashoffset={20 * (1 - Math.max(0, draw * 2 - 1))}
    />
  </svg>
);

export const TxRow: React.FC<{
  ok: boolean;
  title: string;
  amount: string;
  meta: string;
  draw: number;
  style?: React.CSSProperties;
  width?: number;
}> = ({ ok, title, amount, meta, draw, style, width = 760 }) => {
  const color = ok ? COLORS.success : COLORS.danger;
  return (
    <div
      style={{
        width,
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "22px 28px",
        borderRadius: 16,
        backgroundColor: COLORS.ink2,
        border: `1px solid ${ok ? COLORS.border : "rgba(255,107,91,0.35)"}`,
        ...style,
      }}
    >
      {ok ? <CheckIcon draw={draw} color={color} /> : <CrossIcon draw={draw} color={color} />}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: fontBody,
            fontWeight: 600,
            fontSize: 24,
            color: COLORS.white,
          }}
        >
          {title}
        </div>
        <div style={{ fontFamily: fontBody, fontSize: 18, color: COLORS.mute, marginTop: 6 }}>
          {meta}
        </div>
      </div>
      <div
        style={{
          fontFamily: fontDisplay,
          fontWeight: 800,
          fontSize: ok ? 28 : 22,
          letterSpacing: ok ? "-0.02em" : "0.06em",
          color: ok ? COLORS.white : COLORS.danger,
        }}
      >
        {amount}
      </div>
    </div>
  );
};
