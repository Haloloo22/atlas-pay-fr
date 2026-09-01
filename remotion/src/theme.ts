import { Easing, interpolate } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadSchibsted } from "@remotion/google-fonts/SchibstedGrotesk";

export const COLORS = {
  blue: "#4643E3",
  ink: "#0D0E0C",
  ink2: "#16181A",
  white: "#FFFFFF",
  mute: "#9A9C97",
  danger: "#FF6B5B",
  success: "#3DD68C",
  border: "rgba(255,255,255,0.08)",
};

const inter = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });
const schibsted = loadSchibsted("normal", { weights: ["600", "800"], subsets: ["latin"] });

export const fontBody = inter.fontFamily;
export const fontDisplay = schibsted.fontFamily;

/** cubic-bezier(0.16, 1, 0.3, 1) — used everywhere */
export const EZ = Easing.bezier(0.16, 1, 0.3, 1);

/** 400ms max animation at 30fps */
export const DUR = 12;

/** Progress 0→1 starting at `start` for `dur` frames, eased. */
export const prog = (frame: number, start: number, dur = DUR) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EZ,
  });

/** Fade + rise helper */
export const fadeUp = (frame: number, start: number, dist = 20, dur = DUR) => {
  const p = prog(frame, start, dur);
  return { opacity: p, transform: `translateY(${(1 - p) * dist}px)` };
};

export const formatMAD = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
