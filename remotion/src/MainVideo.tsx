import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { COLORS, fontBody } from "./theme";
import { S1Hook } from "./scenes/S1Hook";
import { S2Rules } from "./scenes/S2Rules";
import { S3Approved } from "./scenes/S3Approved";
import { S4Declined } from "./scenes/S4Declined";
import { S5Report } from "./scenes/S5Report";
import { S6Close } from "./scenes/S6Close";

// 300ms fade between sequences
const FADE = 9;
const fadeProps = { presentation: fade(), timing: linearTiming({ durationInFrames: FADE }) };

// Durations include the overlap so the timeline lands on 28s (840f):
// 4s / 5s / 5s / 6s / 5s / 3s
export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink, fontFamily: fontBody }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={120 + FADE}>
          <S1Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition {...fadeProps} />
        <TransitionSeries.Sequence durationInFrames={150 + FADE}>
          <S2Rules />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition {...fadeProps} />
        <TransitionSeries.Sequence durationInFrames={150 + FADE}>
          <S3Approved />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition {...fadeProps} />
        <TransitionSeries.Sequence durationInFrames={180 + FADE}>
          <S4Declined />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition {...fadeProps} />
        <TransitionSeries.Sequence durationInFrames={150 + FADE}>
          <S5Report />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition {...fadeProps} />
        <TransitionSeries.Sequence durationInFrames={90}>
          <S6Close />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
