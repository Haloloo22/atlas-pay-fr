import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../theme";

const FleetCard: React.FC<{ variant: "physical" | "virtual"; delay: number }> = ({ variant, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 130 } });
  const rotY = interpolate(frame - delay, [0, 40, 80], [-40, 0, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(s, [0, 1], [80, 0]);
  const op = interpolate(s, [0, 1], [0, 1]);

  const isVirtual = variant === "virtual";
  return (
    <div
      style={{
        width: 420,
        height: 260,
        borderRadius: 24,
        background: isVirtual
          ? `linear-gradient(135deg, ${COLORS.accent} 0%, #0d9488 100%)`
          : `linear-gradient(135deg, ${COLORS.primary} 0%, #0b1e5b 100%)`,
        padding: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transform: `perspective(1200px) rotateY(${rotY}deg) translateY(${y}px)`,
        opacity: op,
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>FleetPay</div>
        <div
          style={{
            width: 46,
            height: 34,
            borderRadius: 6,
            background: "linear-gradient(135deg, #fde68a, #d4a017)",
          }}
        />
      </div>
      <div>
        <div style={{ fontSize: 26, letterSpacing: "0.15em", fontFamily: "monospace" }}>
          •••• 4829
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontSize: 14, opacity: 0.85 }}>
          <span>{isVirtual ? "VIRTUELLE" : "PHYSIQUE"}</span>
          <span style={{ fontWeight: 700, fontStyle: "italic", fontSize: 20 }}>VISA</span>
        </div>
      </div>
    </div>
  );
};

export const S3Cards: React.FC = () => {
  const frame = useCurrentFrame();
  const kickerOp = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [8, 30], [40, 0], { extrapolateRight: "clamp" });
  const titleOp = interpolate(frame, [8, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ padding: 140, flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontSize: 22, letterSpacing: "0.24em", color: COLORS.accent, opacity: kickerOp, textTransform: "uppercase", fontWeight: 600 }}>
        Étape 02
      </div>
      <div style={{ fontSize: 96, fontWeight: 700, color: COLORS.text, letterSpacing: "-0.04em", lineHeight: 1.05, marginTop: 20, transform: `translateY(${titleY}px)`, opacity: titleOp }}>
        Cartes Visa Fleet
      </div>
      <div style={{ fontSize: 32, color: COLORS.textMuted, marginTop: 24, opacity: titleOp, maxWidth: 900 }}>
        Physiques ou virtuelles, prêtes en 48h
      </div>

      <div style={{ display: "flex", gap: 60, marginTop: 90, alignItems: "center" }}>
        <FleetCard variant="physical" delay={30} />
        <FleetCard variant="virtual" delay={55} />
      </div>
    </AbsoluteFill>
  );
};