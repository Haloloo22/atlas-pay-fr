import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, fadeUp, fontBody, fontDisplay, prog } from "../theme";
import { FlectLogo } from "../components/FlectLogo";
import { TxRow } from "../components/TxRow";

export const S3Approved: React.FC = () => {
  const frame = useCurrentFrame();
  const cardP = prog(frame, 14, 18);
  const rotate = (1 - cardP) * 5;
  const rowStart = 52;
  const rowP = prog(frame, rowStart);
  const draw = prog(frame, rowStart + 6, 9);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 44,
      }}
    >
      <h1
        style={{
          fontFamily: fontDisplay,
          fontWeight: 800,
          fontSize: 56,
          letterSpacing: "-0.02em",
          color: COLORS.white,
          margin: 0,
          ...fadeUp(frame, 4),
        }}
      >
        Votre chauffeur paie. La règle vérifie.
      </h1>

      <div style={{ perspective: 1400 }}>
        <div
          style={{
            width: 520,
            height: 328,
            borderRadius: 22,
            backgroundColor: COLORS.ink2,
            border: `1px solid rgba(255,255,255,0.14)`,
            padding: 34,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: cardP,
            transform: `rotateY(${rotate}deg) rotateX(${rotate * 0.6}deg) translateY(${(1 - cardP) * 16}px)`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <FlectLogo size={34} color={COLORS.blue} />
            <div
              style={{
                width: 48,
                height: 36,
                borderRadius: 7,
                border: "1.5px solid rgba(255,255,255,0.25)",
              }}
            />
          </div>
          <div
            style={{
              fontFamily: fontBody,
              fontSize: 24,
              letterSpacing: "0.2em",
              color: COLORS.white,
            }}
          >
            •••• •••• •••• 4582
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontFamily: fontBody, fontSize: 12, color: COLORS.mute, letterSpacing: "0.12em" }}>
                TITULAIRE
              </div>
              <div style={{ fontFamily: fontBody, fontWeight: 600, fontSize: 18, color: COLORS.white, marginTop: 4 }}>
                K. BENALI · 12345-A-1
              </div>
            </div>
            <div style={{ fontFamily: fontBody, fontSize: 14, color: COLORS.mute }}>VISA FLEET</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <TxRow
          ok
          title="Afriquia — Aïn Sebaâ"
          amount="620 MAD"
          meta="K. Benali · Camion 12345-A-1 · mardi 08:14"
          draw={draw}
          style={{ opacity: rowP, transform: `translateY(${(1 - rowP) * 12}px)` }}
        />
        <div
          style={{
            fontFamily: fontBody,
            fontWeight: 600,
            fontSize: 20,
            color: COLORS.success,
            ...fadeUp(frame, rowStart + 16, 8),
          }}
        >
          Approuvé en 0,8 seconde
        </div>
      </div>
    </AbsoluteFill>
  );
};
