import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../theme";

const TX = [
  { station: "TotalEnergies", city: "Casablanca", amount: 420, color: "#E4032E" },
  { station: "Shell", city: "Rabat", amount: 315, color: "#FFD500" },
  { station: "Afriquia", city: "Marrakech", amount: 580, color: "#00A651" },
  { station: "Winxo", city: "Tanger", amount: 245, color: "#0066B3" },
  { station: "TotalEnergies", city: "Fès", amount: 390, color: "#E4032E" },
];

export const S4Realtime: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kickerOp = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const titleOp = interpolate(frame, [8, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [8, 30], [40, 0], { extrapolateRight: "clamp" });

  const shownCount = Math.min(TX.length, Math.max(0, Math.floor((frame - 35) / 18)));
  const total = TX.slice(0, shownCount).reduce((a, b) => a + b.amount, 0);

  const dotOp = 0.5 + 0.5 * Math.sin(frame / 6);

  return (
    <AbsoluteFill style={{ padding: 140, flexDirection: "row", alignItems: "center", gap: 80 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 22, letterSpacing: "0.24em", color: COLORS.accent, opacity: kickerOp, textTransform: "uppercase", fontWeight: 600 }}>
          Étape 03
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, color: COLORS.text, letterSpacing: "-0.04em", lineHeight: 1.05, marginTop: 20, transform: `translateY(${titleY}px)`, opacity: titleOp }}>
          Suivi en temps réel
        </div>
        <div style={{ fontSize: 32, color: COLORS.textMuted, marginTop: 24, opacity: titleOp, maxWidth: 700 }}>
          Chaque transaction, instantanément
        </div>
        <div style={{ marginTop: 60, opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" }) }}>
          <div style={{ fontSize: 22, color: COLORS.textMuted, fontWeight: 500 }}>Total du jour</div>
          <div style={{ fontSize: 120, fontWeight: 800, color: COLORS.accent, lineHeight: 1, letterSpacing: "-0.04em" }}>
            {total.toLocaleString("fr-FR")} <span style={{ fontSize: 60, color: COLORS.text }}>MAD</span>
          </div>
        </div>
      </div>

      <div
        style={{
          width: 640,
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 20,
          padding: 28,
          opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: COLORS.text }}>Transactions live</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, color: COLORS.success }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: COLORS.success, opacity: dotOp }} />
            EN DIRECT
          </div>
        </div>
        {TX.map((t, i) => {
          const s = spring({ frame: frame - (35 + i * 18), fps, config: { damping: 18, stiffness: 200 } });
          const y = interpolate(s, [0, 1], [30, 0]);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "18px 12px",
                borderBottom: `1px solid ${COLORS.border}`,
                opacity: s,
                transform: `translateY(${y}px)`,
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 10, background: t.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: COLORS.text }}>{t.station}</div>
                <div style={{ fontSize: 16, color: COLORS.textMuted }}>{t.city}</div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.text }}>{t.amount} MAD</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};