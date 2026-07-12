import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../theme";

const TruckIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 3h15v13H1z" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

export const S2Fleet: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kickerOp = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const titleS = spring({ frame: frame - 8, fps, config: { damping: 18, stiffness: 160 } });
  const titleY = interpolate(titleS, [0, 1], [40, 0]);

  const count = Math.min(12, Math.floor(interpolate(frame, [30, 110], [1, 13], { extrapolateRight: "clamp" })));

  return (
    <AbsoluteFill style={{ padding: 140, flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontSize: 22, letterSpacing: "0.24em", color: COLORS.accent, opacity: kickerOp, textTransform: "uppercase", fontWeight: 600 }}>
        Étape 01
      </div>
      <div style={{ fontSize: 96, fontWeight: 700, color: COLORS.text, letterSpacing: "-0.04em", lineHeight: 1.05, marginTop: 20, transform: `translateY(${titleY}px)`, opacity: titleS }}>
        Créez votre flotte
      </div>
      <div style={{ fontSize: 32, color: COLORS.textMuted, marginTop: 24, opacity: titleS, maxWidth: 900 }}>
        Ajoutez véhicules et chauffeurs en quelques minutes
      </div>

      <div style={{ display: "flex", gap: 60, alignItems: "center", marginTop: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const s = spring({ frame: frame - 30 - i * 5, fps, config: { damping: 15, stiffness: 200 } });
            const isActive = i < count;
            return (
              <div
                key={i}
                style={{
                  width: 130,
                  height: 100,
                  background: isActive ? COLORS.card : "rgba(15,30,54,0.3)",
                  border: `1px solid ${isActive ? COLORS.accent + "80" : COLORS.border}`,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${interpolate(s, [0, 1], [0.5, 1])})`,
                  opacity: interpolate(s, [0, 1], [0, 1]),
                }}
              >
                <TruckIcon color={isActive ? COLORS.accent : COLORS.textMuted} />
              </div>
            );
          })}
        </div>

        <div style={{ opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" }) }}>
          <div style={{ fontSize: 24, color: COLORS.textMuted, fontWeight: 500 }}>Véhicules actifs</div>
          <div style={{ fontSize: 200, fontWeight: 800, color: COLORS.text, lineHeight: 1, letterSpacing: "-0.05em" }}>
            {String(Math.min(count, 12)).padStart(2, "0")}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};