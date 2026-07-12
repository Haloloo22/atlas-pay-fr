export const COLORS = {
  bg: "#0A1628",
  bgLight: "#F8FAFC",
  primary: "#1E40AF",
  primaryLight: "#3B82F6",
  accent: "#14B8A6",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  text: "#F8FAFC",
  textMuted: "#94A3B8",
  card: "#0F1E36",
  border: "rgba(148, 163, 184, 0.15)",
};

import { loadFont } from "@remotion/google-fonts/Inter";

export const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});