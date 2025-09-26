import { useState } from "react";
import ParameterSlider from "../ParameterSlider/ParameterSlider";
import ParameterWaveType from "../ParameterWaveType/ParameterWaveType";
import { defaultParameters, type ISoundParameters } from "../../lib/webAudio";

interface Props {
  id: string;
  updateSounds: (id: string, newParams: ISoundParameters) => void;
}

export default function SoundParameters({ id, updateSounds }: Props) {
  const [parameters, setParameters] =
    useState<ISoundParameters>(defaultParameters);

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
        defaultValue={parameters.frequency}
        onSoundParameterChange={(newSetting: unknown) =>
          onSoundParameterChange({
            frequency: newSetting as number,
          })
        }
      />
      <ParameterSlider
        id={`gainSlider-${id}`}
        title="Gain (Phase):"
        range={[-2, 2]}
        defaultValue={parameters.gain}
        step="0.1"
        onSoundParameterChange={(newSetting: unknown) =>
          onSoundParameterChange({ gain: newSetting as number })
        }
      />
      <ParameterSlider
        id={`gainSlider-${id}`}
        title="Duration (Seconds):"
        range={[1, 10]}
        defaultValue={parameters.durationSeconds}
        step="1"
        onSoundParameterChange={(newSetting: unknown) =>
          onSoundParameterChange({ durationSeconds: newSetting as number })
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
