import { useState } from "react";
import { defaultParameters, play, type ISoundParameters } from "./lib/webAudio";
import SoundParameters from "./components/Sound/SoundParameters";
import "./App.css";

const AudioContext = window.AudioContext;
const audioCtx = new AudioContext();

interface ISound {
  title: string;
  parameters: ISoundParameters;
}

const DEFAULT_SOUNDS: { [id: string]: ISound } = {
  sound1: { title: "Sound 1", parameters: defaultParameters },
  sound2: { title: "Sound 1", parameters: defaultParameters },
};

function App() {
  const [sounds, setSounds] = useState<{ [id: string]: ISound }>(
    DEFAULT_SOUNDS
  );

  const onPlaySound = (id: string) => {
    const { gain, type, frequency } = sounds[id].parameters;
    play({ audioCtx, gain, type, frequency });
  };

  const updateSounds = (id: string, parameters: ISoundParameters) => {
    setSounds({ ...sounds, [id]: { ...sounds[id], parameters } });
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
