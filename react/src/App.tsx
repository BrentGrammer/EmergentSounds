import "./App.css";
import ParameterSlider from "./components/ParameterSlider/ParameterSlider";
import ParameterWaveType from "./components/ParameterWaveType/ParameterWaveType";

const AudioContext = window.AudioContext;
const audioCtx = new AudioContext();

function App() {

  const createOscillator = ({
    frequency,
    type,
  }: {
    frequency: number;
    type: OscillatorType;
  }) => {
    const osc = audioCtx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    return osc;
  };

  const play = ({
    gain,
    frequency,
    type,
    lengthMs = 2000,
  }: {
    gain: number;
    frequency: number;
    type: OscillatorType;
    lengthMs: number;
  }) => {
    const osc = createOscillator({ frequency, type });
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(gain, audioCtx.currentTime);

    osc.connect(gainNode).connect(audioCtx.destination);
    osc.start();

    setTimeout(() => {
      osc.stop();
    }, lengthMs);
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
        />
        <ParameterSlider
          id="gainSlider-1"
          title="Gain:"
          range={[-2, 2]}
          defaultValue={1}
          step="0.1"
        />
        <ParameterWaveType id="waveType-1" />
      </div>

      <div className="button-container">
        <button id="osc1">Play Sound 1</button>
      </div>

      <h2>Sound 2</h2>
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
      </div>

      <div className="button-container">
        <button id="osc2" onClick={() => play()}>Play Sound 2</button>
      </div>

      <div className="button-container">
        <button id="both">Play Both Together</button>
      </div>
    </main>
  );
}

export default App;
