import { useState } from "react";
import ParameterSlider from "./components/ParameterSlider/ParameterSlider";
import ParameterWaveType from "./components/ParameterWaveType/ParameterWaveType";
import { play, type ISoundSetting } from "./lib/webAudio";
import "./App.css";

const AudioContext = window.AudioContext;
const audioCtx = new AudioContext();

function App() {
  const [soundSettings, setSoundSettings] = useState<{
    [id: string]: ISoundSetting;
  }>({});

  const onPlaySound = (id: string) => {
    const { gain, type, frequency } = soundSettings[id];
    play({ audioCtx, gain, type, frequency });
  };

  const onSoundParameterChange = (
    id: string,
    newSetting: Partial<ISoundSetting>
  ) => {
    console.log({ id, newSetting });
    const update = { ...soundSettings[id], ...newSetting };
    setSoundSettings({ ...soundSettings, [id]: update });
  };

  return (
    <main>
      <h1>Sound Emergence</h1>
      <p>
        Experiment by adjusting the parameters for each sound individually, then
        click "Play Both" to hear them cancel each other out.
      </p>
      <ul>
        <li>
          Destructive Interference: Set the gain of sound 1 to "1" and the gain
          of sound 2 to "-1" so they cancel each other out (you will hear
          silence when playing both together)
        </li>
      </ul>

      <h2>Sound 1</h2>
      <div className="controls-container">
        <ParameterSlider
          id="frequencySlider-1"
          title="Frequency(Hz):"
          range={[50, 1000]}
          defaultValue={440}
          onSoundParameterChange={(newSetting: unknown) =>
            onSoundParameterChange("sound1", {
              frequency: newSetting as number,
            })
          }
        />
        <ParameterSlider
          id="gainSlider-1"
          title="Gain:"
          range={[-2, 2]}
          defaultValue={1}
          step="0.1"
          onSoundParameterChange={(newSetting: unknown) =>
            onSoundParameterChange("sound1", { gain: newSetting as number })
          }
        />
        <ParameterWaveType
          id="waveType-1"
          onSoundParameterChange={(newSetting: unknown) =>
            onSoundParameterChange("sound1", {
              type: newSetting as OscillatorType,
            })
          }
        />
      </div>

      <div className="button-container">
        <button onClick={() => onPlaySound("sound1")}>Play Sound 1</button>
      </div>

      {/* <h2>Sound 2</h2>
      <div className="controls-container">
        <ParameterSlider
          id="frequencySlider-2"
          title="Frequency(Hz):"
          range={[50, 1000]}
          defaultValue={440}
        />
        <ParameterSlider
          id="gainSlider-2"
          title="Gain:"
          range={[-2, 2]}
          defaultValue={1}
          step="0.1"
        />
        <ParameterWaveType id="waveType-2" />
      </div> */}

      {/* <div className="button-container">
        <button id="osc2" onClick={() => onPlaySound("osc2")}>
          Play Sound 2
        </button>
      </div> */}

      <div className="button-container">
        <button id="both">Play Both Together</button>
      </div>
    </main>
  );
}

export default App;
