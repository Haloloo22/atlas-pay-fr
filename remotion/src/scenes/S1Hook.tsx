import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../theme";

const WORD = "FleetPay";

export const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const taglineOp = interpolate(frame, [55, 72], [0, 1], { extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [55, 72], [12, 0], { extrapolateRight: "clamp" });

  // Background subtle gradient orbs
  const orbX = interpolate(frame, [0, 90], [-40, 40]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${50 + orbX / 4}% 30%, rgba(30,64,175,0.35), transparent 55%), ${COLORS.bg}`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", gap: 4 }}>
        {WORD.split("").map((c, i) => {
          const s = spring({ frame: frame - i * 4, fps, config: { damping: 14, stiffness: 180 } });
          const y = interpolate(s, [0, 1], [80, 0]);
          const op = interpolate(s, [0, 1], [0, 1]);
          const scale = interpolate(s, [0, 1], [0.6, 1]);
          return (
            <span
              key={i}
              style={{
                fontSize: 200,
                fontWeight: 800,
                letterSpacing: "-0.05em",
                color: i >= 5 ? COLORS.accent : COLORS.text,
                transform: `translateY(${y}px) scale(${scale})`,
                opacity: op,
                display: "inline-block",
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
          marginTop: 36,
          opacity: taglineOp,
          transform: `translateY(${taglineY}px)`,
          fontSize: 36,
          fontWeight: 400,
          color: COLORS.textMuted,
          letterSpacing: "0.02em",
        }}
      >
        Votre flotte sous contrôle
      </div>
    </AbsoluteFill>
  );
};