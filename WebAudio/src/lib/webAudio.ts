const createOscillator = ({
  audioCtx,
  frequency,
  type,
}: {
  audioCtx: AudioContext;
  frequency: number;
  type: OscillatorType;
}) => {
  const osc = audioCtx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  return osc;
};

export const play = ({
  audioCtx,
  gain,
  frequency,
  type,
  lengthMs = 2000,
}: {
  audioCtx: AudioContext;
  gain: number;
  frequency: number;
  type: OscillatorType;
  lengthMs?: number;
}) => {
  const osc = createOscillator({ audioCtx, frequency, type });
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(gain, audioCtx.currentTime);

  osc.connect(gainNode).connect(audioCtx.destination);
  osc.start();

  setTimeout(() => {
    osc.stop();
  }, lengthMs);
};

export interface ISoundParameters {
  gain: number;
  type: OscillatorType;
  frequency: number;
}

export const defaultParameters: ISoundParameters = {
  frequency: 440,
  gain: 1,
  type: "sine",
};
