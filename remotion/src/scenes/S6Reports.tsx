import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../theme";

const BARS = [65, 82, 55, 90, 72, 88, 95];
const LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export const S6Reports: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kickerOp = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const titleOp = interpolate(frame, [8, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [8, 30], [40, 0], { extrapolateRight: "clamp" });

  // Final CTA slide takes over around frame 95
  const ctaS = spring({ frame: frame - 90, fps, config: { damping: 18, stiffness: 130 } });
  const contentOp = interpolate(frame, [85, 100], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* Content phase */}
      <AbsoluteFill style={{ padding: 140, flexDirection: "row", alignItems: "center", gap: 100, opacity: contentOp }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 22, letterSpacing: "0.24em", color: COLORS.accent, opacity: kickerOp, textTransform: "uppercase", fontWeight: 600 }}>
            Étape 05
          </div>
          <div style={{ fontSize: 96, fontWeight: 700, color: COLORS.text, letterSpacing: "-0.04em", lineHeight: 1.05, marginTop: 20, transform: `translateY(${titleY}px)`, opacity: titleOp }}>
            Rapports & analytics
          </div>
          <div style={{ fontSize: 32, color: COLORS.textMuted, marginTop: 24, opacity: titleOp, maxWidth: 700 }}>
            Exportez en PDF ou Excel en un clic
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 50, opacity: interpolate(frame, [55, 75], [0, 1], { extrapolateRight: "clamp" }) }}>
            <div style={{ padding: "16px 28px", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, fontSize: 22, color: COLORS.text, fontWeight: 600 }}>
              📄 Export PDF
            </div>
            <div style={{ padding: "16px 28px", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, fontSize: 22, color: COLORS.text, fontWeight: 600 }}>
              📊 Export Excel
            </div>
          </div>
        </div>

        <div
          style={{
            width: 640,
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 20,
            padding: 40,
            opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 600, color: COLORS.text, marginBottom: 8 }}>Dépenses / semaine</div>
          <div style={{ fontSize: 44, fontWeight: 800, color: COLORS.accent, letterSpacing: "-0.03em" }}>
            48 240 <span style={{ fontSize: 22, color: COLORS.textMuted, fontWeight: 500 }}>MAD</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 240, marginTop: 40 }}>
            {BARS.map((h, i) => {
              const s = spring({ frame: frame - (35 + i * 6), fps, config: { damping: 20, stiffness: 150 } });
              const height = interpolate(s, [0, 1], [0, h * 2.2]);
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: "100%",
                      height,
                      background: `linear-gradient(180deg, ${COLORS.accent} 0%, ${COLORS.primary} 100%)`,
                      borderRadius: "8px 8px 4px 4px",
                    }}
                  />
                  <div style={{ fontSize: 16, color: COLORS.textMuted, fontWeight: 500 }}>{LABELS[i]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>

      {/* Final CTA */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          opacity: interpolate(frame, [95, 115], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: 40,
            color: COLORS.textMuted,
            letterSpacing: "0.02em",
            transform: `translateY(${interpolate(ctaS, [0, 1], [30, 0])}px)`,
          }}
        >
          Prêt à essayer ?
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 24 }}>
          {"FleetPay".split("").map((c, i) => {
            const s = spring({ frame: frame - 100 - i * 3, fps, config: { damping: 14, stiffness: 180 } });
            return (
              <span
                key={i}
                style={{
                  fontSize: 160,
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  color: i >= 5 ? COLORS.accent : COLORS.text,
                  transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px)`,
                  opacity: s,
                  lineHeight: 1,
                }}
              >
                {c}
              </span>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 50,
            padding: "22px 44px",
            background: COLORS.accent,
            color: "#0A1628",
            fontSize: 32,
            fontWeight: 700,
            borderRadius: 14,
            opacity: interpolate(frame, [115, 135], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          atlas-pay-fr.lovable.app
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};