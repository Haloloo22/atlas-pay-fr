import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, fadeUp, fontBody, fontDisplay, prog } from "../theme";
import { TxRow } from "../components/TxRow";
import { FlectMark } from "../components/FlectLogo";

export const S4Declined: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rowStart = 26;
  const rowP = prog(frame, rowStart);
  const draw = prog(frame, rowStart + 4, 9);
  // 3px horizontal shake over ~150ms (5 frames)
  const shake = interpolate(frame, [rowStart + 8, rowStart + 9, rowStart + 10, rowStart + 11, rowStart + 12, rowStart + 13], [0, -3, 3, -2, 2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const notifStart = rowStart + 24;
  const notifS = spring({ frame: frame - notifStart, fps, config: { damping: 18, stiffness: 160, mass: 0.8 } });
  const notifY = interpolate(notifS, [0, 1], [-140, 0]);
  const notifOp = interpolate(frame, [notifStart, notifStart + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 56 }}
      >
        <h1
          style={{
            fontFamily: fontDisplay,
            fontWeight: 800,
            fontSize: 64,
            letterSpacing: "-0.02em",
            color: COLORS.white,
            margin: 0,
            ...fadeUp(frame, 4),
          }}
        >
          Et quand ça sort du cadre.
        </h1>

        <TxRow
          ok={false}
          title="Station hors liste — Berrechid"
          amount="REFUSÉ"
          meta="O. Chraibi · dimanche 22:41"
          draw={draw}
          width={820}
          style={{ opacity: rowP, transform: `translate(${shake}px, ${(1 - rowP) * 12}px)` }}
        />

        <div
          style={{
            fontFamily: fontDisplay,
            fontWeight: 600,
            fontSize: 34,
            color: COLORS.white,
            letterSpacing: "-0.01em",
            ...fadeUp(frame, notifStart + 14, 16),
          }}
        >
          Vous êtes prévenu sur le moment. Pas en fin de mois.
        </div>
      </AbsoluteFill>

      {/* Phone notification */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 80,
          width: 520,
          padding: "22px 26px",
          borderRadius: 22,
          backgroundColor: "rgba(255,255,255,0.96)",
          opacity: notifOp,
          transform: `translateY(${notifY}px)`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                backgroundColor: COLORS.blue,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FlectMark size={18} color={COLORS.white} />
            </div>
            <span style={{ fontFamily: fontBody, fontWeight: 600, fontSize: 17, color: COLORS.ink }}>
              ⚡ Flect
            </span>
          </div>
          <span style={{ fontFamily: fontBody, fontSize: 15, color: "#6B6D68" }}>il y a 1 seconde</span>
        </div>
        <div
          style={{
            fontFamily: fontBody,
            fontSize: 19,
            lineHeight: 1.35,
            color: COLORS.ink,
            marginTop: 10,
          }}
        >
          <span style={{ fontWeight: 600 }}>Transaction refusée</span> — hors horaires et station non
          autorisée
        </div>
      </div>
    </AbsoluteFill>
  );
};
