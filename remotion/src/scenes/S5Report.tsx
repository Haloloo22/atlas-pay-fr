import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, fadeUp, fontBody, fontDisplay, formatMAD, prog } from "../theme";

const STATS = [
  { label: "Dépensé ce mois", value: 284468, format: (n: number) => `${formatMAD(n)} MAD` },
  { label: "Véhicules suivis", value: 35, format: (n: number) => `${Math.round(n)} / 35` },
  { label: "Transactions refusées", value: 4, format: (n: number) => `${Math.round(n)}` },
];

const BARS = [0.58, 0.72, 0.64, 0.81, 0.69, 0.9, 0.77, 0.86];
const LABELS = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];

export const S5Report: React.FC = () => {
  const frame = useCurrentFrame();
  const START = 22;
  const BAR_START = START + 36;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        flexDirection: "row",
        alignItems: "center",
        padding: "0 140px",
        gap: 90,
      }}
    >
      <div style={{ flex: 1 }}>
        <h1
          style={{
            fontFamily: fontDisplay,
            fontWeight: 800,
            fontSize: 60,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: COLORS.white,
            margin: 0,
            ...fadeUp(frame, 6),
          }}
        >
          Chaque dirham justifié, automatiquement.
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
          Rapport mensuel et export comptable en un clic
        </p>
      </div>

      <div
        style={{
          flex: 1.15,
          borderRadius: 22,
          backgroundColor: COLORS.ink2,
          border: `1px solid ${COLORS.border}`,
          padding: 36,
          display: "flex",
          flexDirection: "column",
          gap: 34,
          ...fadeUp(frame, START - 6, 16),
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 20 }}>
          {STATS.map((s, i) => {
            const p = prog(frame, START + i * 3, 27);
            return (
              <div key={i}>
                <div style={{ fontFamily: fontBody, fontSize: 16, color: COLORS.mute }}>{s.label}</div>
                <div
                  style={{
                    fontFamily: fontDisplay,
                    fontWeight: 800,
                    fontSize: i === 0 ? 40 : 36,
                    letterSpacing: "-0.02em",
                    color: i === 2 ? COLORS.danger : COLORS.white,
                    marginTop: 8,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.format(s.value * p)}
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div style={{ fontFamily: fontBody, fontSize: 15, color: COLORS.mute, marginBottom: 14 }}>
            Dépenses hebdomadaires
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 200 }}>
            {BARS.map((h, i) => {
              const p = prog(frame, BAR_START + i * 2.5, 12);
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, height: "100%", justifyContent: "flex-end" }}>
                  <div
                    style={{
                      width: "100%",
                      height: `${h * 100 * p}%`,
                      borderRadius: 6,
                      backgroundColor: COLORS.blue,
                    }}
                  />
                  <div style={{ fontFamily: fontBody, fontSize: 13, color: COLORS.mute }}>{LABELS[i]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
