import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../theme";

// Simplified Morocco silhouette path (approximate)
const MOROCCO_PATH =
  "M120,80 L280,60 L360,90 L440,130 L500,200 L520,290 L490,380 L420,450 L340,490 L260,500 L180,470 L110,410 L70,320 L60,230 L80,150 Z";

export const S5Alerts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kickerOp = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const titleOp = interpolate(frame, [8, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [8, 30], [40, 0], { extrapolateRight: "clamp" });

  // Zone circle: draw
  const zoneR = interpolate(frame, [30, 55], [0, 90], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Pin travel: starts inside zone, moves out around frame 70
  const pinX = interpolate(frame, [55, 120], [260, 400], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pinY = interpolate(frame, [55, 120], [280, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const outsideZone = frame > 90;

  const alertS = spring({ frame: frame - 95, fps, config: { damping: 14, stiffness: 180 } });
  const alertOp = frame > 90 ? alertS : 0;

  return (
    <AbsoluteFill style={{ padding: 140, flexDirection: "row", alignItems: "center", gap: 100 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 22, letterSpacing: "0.24em", color: COLORS.warning, opacity: kickerOp, textTransform: "uppercase", fontWeight: 600 }}>
          Étape 04
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, color: COLORS.text, letterSpacing: "-0.04em", lineHeight: 1.05, marginTop: 20, transform: `translateY(${titleY}px)`, opacity: titleOp }}>
          Alertes & géofencing
        </div>
        <div style={{ fontSize: 32, color: COLORS.textMuted, marginTop: 24, opacity: titleOp, maxWidth: 700 }}>
          Détectez toute anomalie hors zone autorisée
        </div>

        <div
          style={{
            marginTop: 60,
            background: outsideZone ? "rgba(239,68,68,0.12)" : COLORS.card,
            border: `1px solid ${outsideZone ? COLORS.danger : COLORS.border}`,
            borderRadius: 16,
            padding: 28,
            display: "flex",
            gap: 20,
            alignItems: "center",
            opacity: alertOp,
            transform: `translateY(${interpolate(alertS, [0, 1], [20, 0])}px)`,
          }}
        >
          <div style={{ width: 60, height: 60, borderRadius: 30, background: COLORS.danger, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 800, color: "#fff" }}>
            !
          </div>
          <div>
            <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.text }}>Sortie de zone détectée</div>
            <div style={{ fontSize: 20, color: COLORS.textMuted, marginTop: 4 }}>Véhicule 12345-A-12 · il y a 2s</div>
          </div>
        </div>
      </div>

      <div style={{ width: 620, height: 620, position: "relative", opacity: interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" }) }}>
        <svg viewBox="0 0 600 560" width="100%" height="100%">
          <defs>
            <radialGradient id="landGrad" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="100%" stopColor="#0f2340" />
            </radialGradient>
          </defs>
          {/* Country */}
          <path d={MOROCCO_PATH} fill="url(#landGrad)" stroke={COLORS.accent} strokeWidth="2" strokeOpacity="0.5" />

          {/* Geofencing zone circle (Casablanca area) */}
          <circle
            cx={260}
            cy={280}
            r={zoneR}
            fill={COLORS.accent}
            fillOpacity={0.12}
            stroke={COLORS.accent}
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />

          {/* Vehicle pin */}
          {frame > 40 && (
            <g transform={`translate(${pinX},${pinY})`}>
              <circle r="18" fill={outsideZone ? COLORS.danger : COLORS.accent} />
              <circle r="26" fill={outsideZone ? COLORS.danger : COLORS.accent} fillOpacity="0.25" />
              <circle r="6" fill="#fff" />
            </g>
          )}

          {/* City label */}
          <text x="260" y="410" fill={COLORS.textMuted} fontSize="20" textAnchor="middle" fontWeight="500">
            Casablanca
          </text>
        </svg>
      </div>
    </AbsoluteFill>
  );
};