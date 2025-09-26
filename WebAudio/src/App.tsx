import { useState } from "react";
import {
  defaultParameters,
  play,
  type ISound,
  type ISoundParameters,
} from "./lib/webAudio";
import "./App.css";
import Sound from "./components/Sound/Sound";

const AudioContext = window.AudioContext;
const audioCtx = new AudioContext();

const PLAY_ALL_TEXT = "Play All Together";

const DEFAULT_SOUNDS: { [id: string]: ISound } = {
  sound1: { title: "Sound 1", parameters: defaultParameters },
  sound2: { title: "Sound 2", parameters: defaultParameters },
};
const defaultHighestSoundNumber = Object.keys(DEFAULT_SOUNDS).length;

function App() {
  const [sounds, setSounds] = useState<{ [id: string]: ISound }>(
    DEFAULT_SOUNDS
  );
  const [highestSoundNumber, setHighestSoundNumber] = useState(
    defaultHighestSoundNumber
  );

  const onPlaySound = (id: string) => {
    const { gain, type, frequency, durationSeconds } = sounds[id].parameters;
    play({ audioCtx, gain, type, frequency, durationSeconds });
  };

  const updateSounds = (id: string, parameters: ISoundParameters) => {
    setSounds({ ...sounds, [id]: { ...sounds[id], parameters } });
  };

  const playAll = () => {
    Object.values(sounds).forEach((sound) => {
      const { gain, type, frequency, durationSeconds } = sound.parameters;
      play({ audioCtx, gain, frequency, type, durationSeconds });
    });
  };

  const addSound = () => {
    const soundNum = highestSoundNumber + 1;
    const newSound = {
      title: `Sound ${soundNum}`,
      parameters: defaultParameters,
    };
    setHighestSoundNumber(soundNum);
    setSounds({ ...sounds, ...{ [`sound${soundNum}`]: newSound } });
  };

  const removeSound = (id: string, soundNumber: number) => {
    const updatedSounds = { ...sounds };
    delete updatedSounds[id];
    setSounds(updatedSounds);
    if (soundNumber === highestSoundNumber) {
      setHighestSoundNumber(highestSoundNumber - 1);
    }
  };

  return (
    <main className="main-container">
      <h1>Sound Emergence</h1>
      <article className="experiments-container">
        <p>
          Experiment by adjusting the parameters for each sound individually,
          then click "{PLAY_ALL_TEXT}" to hear them cancel each other out.
        </p>
        <ul>
          <li>
            Destructive Interference: Set the gain of sound 1 to "1" and the
            gain of sound 2 to "-1" so they cancel each other out (you will hear
            silence when playing the sounds together)
          </li>
          <li>
            Adjust the Frequency of one sound slightly higher or lower than the
            other to hear the pulsing result.
          </li>
        </ul>
      </article>

      <section className="sounds-container">
        {Object.keys(sounds).map((soundId) => {
          const sound = sounds[soundId];

          return (
            <div key={`playsound-${soundId}`}>
              <Sound
                sound={sound}
                soundId={soundId}
                removeSound={removeSound}
                updateSounds={updateSounds}
                onPlaySound={onPlaySound}
              />
            </div>
          );
        })}
      </section>

      <div className="flex-center">
        <button onClick={addSound}>+ Add a Sound</button>
      </div>

      <div className="flex-center">
        <button onClick={playAll}>{PLAY_ALL_TEXT}</button>
      </div>
    </main>
  );
}

export default App;
