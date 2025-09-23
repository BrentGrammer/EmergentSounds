import { useState } from "react";
import ParameterSlider from "../ParameterSlider/ParameterSlider";
import ParameterWaveType from "../ParameterWaveType/ParameterWaveType";
import type { ISoundParameters } from "../../lib/webAudio";

const defaultSoundSetting: ISoundParameters = {
  gain: 1.0,
  type: "sine",
  frequency: 440,
};

interface Props {
  id: string;
  updateSounds: (id: string, newParams: ISoundParameters) => void;
}

export default function SoundParameters({ id, updateSounds }: Props) {
  const [parameters, setParameters] =
    useState<ISoundParameters>(defaultSoundSetting);

  const onSoundParameterChange = (newParams: Partial<ISoundParameters>) => {
    const updatedParams = { ...parameters, ...newParams };
    setParameters(updatedParams);
    updateSounds(id, updatedParams);
  };

  return (
    <div className="controls-container">
      <ParameterSlider
        id={`frequencySlider-${id}`}
        title="Frequency(Hz):"
        range={[50, 1000]}
        defaultValue={defaultSoundSetting.frequency}
        onSoundParameterChange={(newSetting: unknown) =>
          onSoundParameterChange({
            frequency: newSetting as number,
          })
        }
      />
      <ParameterSlider
        id={`gainSlider-${id}`}
        title="Gain:"
        range={[-2, 2]}
        defaultValue={defaultSoundSetting.gain}
        step="0.1"
        onSoundParameterChange={(newSetting: unknown) =>
          onSoundParameterChange({ gain: newSetting as number })
        }
      />
      <ParameterWaveType
        id={`waveType-${id}`}
        onSoundParameterChange={(newSetting: OscillatorType) =>
          onSoundParameterChange({
            type: newSetting,
          })
        }
      />
    </div>
  );
}
