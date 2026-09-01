import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, fadeUp, fontBody, fontDisplay, prog } from "../theme";
import { FlectLogo } from "../components/FlectLogo";

export const S6Close: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = prog(frame, 4, 18);
  const word = prog(frame, 20, 10);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 34,
      }}
    >
      <FlectLogo size={96} draw={draw} wordOpacity={word} />
      <div
        style={{
          fontFamily: fontBody,
          fontSize: 22,
          color: COLORS.mute,
          ...fadeUp(frame, 28, 12),
        }}
      >
        Le contrôle des dépenses carburant, pour les flottes marocaines.
      </div>
      <div
        style={{
          marginTop: 10,
          padding: "16px 40px",
          borderRadius: 999,
          backgroundColor: COLORS.blue,
          color: COLORS.white,
          fontFamily: fontDisplay,
          fontWeight: 800,
          fontSize: 24,
          ...fadeUp(frame, 40, 16),
        }}
      >
        flect.ma
      </div>
    </AbsoluteFill>
  );
};
