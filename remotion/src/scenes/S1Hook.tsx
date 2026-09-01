import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, fadeUp, fontDisplay } from "../theme";

const LINE1 = "Le mois dernier, votre flotte a consommé du carburant.";
const LINE2 = "Pouvez-vous dire où est parti chaque dirham ?";

const Words: React.FC<{ text: string; start: number; color: string; frame: number }> = ({
  text,
  start,
  color,
  frame,
}) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "0 18px",
      maxWidth: 1400,
      fontFamily: fontDisplay,
      fontWeight: 800,
      fontSize: 68,
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
      color,
    }}
  >
    {text.split(" ").map((w, i) => (
      <span key={i} style={{ display: "inline-block", ...fadeUp(frame, start + i * 2, 20) }}>
        {w}
      </span>
    ))}
  </div>
);

export const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 36,
        padding: 120,
      }}
    >
      <Words text={LINE1} start={8} color={COLORS.white} frame={frame} />
      <Words text={LINE2} start={53} color={COLORS.blue} frame={frame} />
    </AbsoluteFill>
  );
};
