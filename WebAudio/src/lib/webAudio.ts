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
  durationSeconds = 2,
}: {
  audioCtx: AudioContext;
  gain: number;
  frequency: number;
  type: OscillatorType;
  durationSeconds?: number;
}) => {
  const osc = createOscillator({ audioCtx, frequency, type });
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(gain, audioCtx.currentTime);

  osc.connect(gainNode).connect(audioCtx.destination);
  osc.start();

  setTimeout(() => {
    osc.stop();
  }, durationSeconds * 1000);
};

export interface ISoundParameters {
  gain: number;
  type: OscillatorType;
  frequency: number;
  durationSeconds: number;
}

export const defaultParameters: ISoundParameters = {
  frequency: 440,
  gain: 1,
  type: "sine",
  durationSeconds: 2,
};

export interface ISound {
  title: string;
  parameters: ISoundParameters;
}
