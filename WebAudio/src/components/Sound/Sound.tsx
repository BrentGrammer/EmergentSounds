import { FaTimes } from "react-icons/fa";
import SoundParameters from "../SoundParameters/SoundParameters";
import type { ISound, ISoundParameters } from "../../lib/webAudio";

interface Props {
  sound: ISound;
  soundId: string;
  removeSound: (soundId: string, soundNumber: number) => void;
  updateSounds: (soundId: string, newParams: ISoundParameters) => void;
  onPlaySound: (soundId: string) => void;
  toggleMuted: (soundId: string) => void;
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
  toggleMuted,
}: Props) {

  const shouldIncludePlayback = sound.parameters.muted === false;

  return (
    <>
      <div className="sound-title-container">
        <div className="sound-title-container-left">
          <h2 style={{ margin: 0, padding: 0 }}>{sound.title}</h2>

          <input
            id={`playselect-${soundId}`}
            className="muted-checkbox"
            type="checkbox"
            checked={shouldIncludePlayback}
            onChange={() => toggleMuted(soundId)}
            title={
              shouldIncludePlayback
                ? "Deselect for Playback"
                : "Select for Playback"
            }
          />
        </div>

        <FaTimes
          size={30}
          onClick={() => removeSound(soundId, parseSoundNumber(soundId))}
          className="icon-delete-button"
          title={`Remove ${sound.title}`}
        />
      </div>

      <SoundParameters id={soundId} updateSounds={updateSounds} />

      <button onClick={() => onPlaySound(soundId)}>Play {sound.title}</button>
    </>
  );
}
