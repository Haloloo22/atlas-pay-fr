import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, fadeUp, fontBody, fontDisplay, prog } from "../theme";

const RULES = [
  { label: "Plafond par plein", value: "1 200 MAD" },
  { label: "Horaires", value: "Lun-Sam, 6h → 20h" },
  { label: "Stations", value: "Afriquia, TotalEnergies, Shell, Winxo" },
];

const Toggle: React.FC<{ on: number }> = ({ on }) => (
  <div
    style={{
      width: 60,
      height: 34,
      borderRadius: 17,
      backgroundColor: on > 0.5 ? COLORS.blue : "rgba(255,255,255,0.12)",
      position: "relative",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 4,
        left: 4 + on * 26,
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: COLORS.white,
      }}
    />
  </div>
);

export const S2Rules: React.FC = () => {
  const frame = useCurrentFrame();
  const START = 30;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        flexDirection: "row",
        alignItems: "center",
        padding: "0 140px",
        gap: 100,
      }}
    >
      <div style={{ flex: 1 }}>
        <h1
          style={{
            fontFamily: fontDisplay,
            fontWeight: 800,
            fontSize: 64,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: COLORS.white,
            margin: 0,
            ...fadeUp(frame, 6),
          }}
        >
          Vous fixez les règles.
          <br />
          Une fois.
        </h1>
        <p
          style={{
            fontFamily: fontBody,
            fontSize: 26,
            color: COLORS.mute,
            marginTop: 24,
            ...fadeUp(frame, 14, 12),
          }}
        >
          Plafonds, horaires, stations autorisées
        </p>
      </div>

      <div style={{ flex: 1.1, display: "flex", flexDirection: "column", gap: 18 }}>
        {RULES.map((r, i) => {
          const s = START + i * 15;
          const p = prog(frame, s);
          const on = prog(frame, s + 6, 6);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
                padding: "28px 32px",
                borderRadius: 16,
                backgroundColor: COLORS.ink2,
                border: `1px solid ${COLORS.border}`,
                opacity: p,
                transform: `translateX(${(1 - p) * 24}px)`,
              }}
            >
              <div style={{ fontFamily: fontBody, fontSize: 24, color: COLORS.white }}>
                <span style={{ fontWeight: 600 }}>{r.label}</span>
                <span style={{ color: COLORS.mute }}> — </span>
                <span style={{ fontWeight: 400 }}>{r.value}</span>
              </div>
              <Toggle on={on} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
