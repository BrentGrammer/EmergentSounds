import { FaTimes } from "react-icons/fa";
import SoundParameters from "../SoundParameters/SoundParameters";
import type { ISound, ISoundParameters } from "../../lib/webAudio";

interface Props {
  sound: ISound;
  soundId: string;
  removeSound: (soundId: string, soundNumber: number) => void;
  updateSounds: (soundId: string, newParams: ISoundParameters) => void;
  onPlaySound: (soundId: string) => void;
}

function parseSoundNumber(id: string): number {
  const numberMatch = id.match(/\d+/);
  const num = numberMatch ? parseInt(numberMatch[0], 10) : null;
  if (num === null) {
    alert("ERROR: could not parse the number of the sound");
    throw new Error("Sound number is null");
  }
  return num;
}

export default function Sound({
  sound,
  soundId,
  removeSound,
  updateSounds,
  onPlaySound,
}: Props) {
  return (
    <>
      <div className="sound-title-container">
        <h2>{sound.title}</h2>

        <button
          onClick={() => removeSound(soundId, parseSoundNumber(soundId))}
          className="icon-delete-button"
          title={`Remove ${sound.title}`}
        >
          <FaTimes size={30} />
        </button>
      </div>

      <SoundParameters id={soundId} updateSounds={updateSounds} />

      <div className="button-container">
        <button onClick={() => onPlaySound(soundId)}>Play {sound.title}</button>
      </div>
    </>
  );
}
