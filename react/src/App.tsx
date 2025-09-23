import { useState } from "react";
import { play, type ISoundParameters } from "./lib/webAudio";
import SoundParameters from "./components/Sound/SoundParameters";
import "./App.css";

const AudioContext = window.AudioContext;
const audioCtx = new AudioContext();

const defaultParameters: ISoundParameters = {
  frequency: 440,
  gain: 1,
  type: "sine",
};

const DEFAULT_SOUNDS: { [id: string]: ISoundParameters } = {
  sound1: defaultParameters,
  sound2: defaultParameters,
};

function App() {
  const [sounds, setSounds] = useState<{
    [id: string]: ISoundParameters;
  }>(DEFAULT_SOUNDS);

  const onPlaySound = (id: string) => {
    const { gain, type, frequency } = sounds[id];
    play({ audioCtx, gain, type, frequency });
  };

  const updateSounds = (id: string, params: ISoundParameters) => {
    setSounds({ ...sounds, [id]: params });
  };

  const playAll = () => {
    console.log("all");
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
      <SoundParameters id="sound1" updateSounds={updateSounds} />
      <div className="button-container">
        <button onClick={() => onPlaySound("sound1")}>Play Sound 1</button>
      </div>

      <h2>Sound 2</h2>
      <SoundParameters id="sound2" updateSounds={updateSounds} />
      <div className="button-container">
        <button onClick={() => onPlaySound("sound2")}>Play Sound 2</button>
      </div>

      <div className="button-container">
        <button onClick={playAll}>Play All Together</button>
      </div>
    </main>
  );
}

export default App;
