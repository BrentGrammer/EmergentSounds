const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function createOscillator({ frequency, type }) {
  const osc = audioCtx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  return osc;
}

function play({ gain, frequency, type, lengthMs = 2000 }) {
  const osc = createOscillator({ frequency, type });
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(gain, audioCtx.currentTime);

  osc.connect(gainNode).connect(audioCtx.destination);
  osc.start();

  setTimeout(() => {
    osc.stop();
  }, lengthMs);
}

// Add listeners for Sound 1's UI
document.getElementById("frequencySlider-1").addEventListener("input", (e) => {
  document.getElementById("frequencyValue-1").textContent = e.target.value;
});
document.getElementById("gainSlider-1").addEventListener("input", (e) => {
  document.getElementById("gainValue-1").textContent = e.target.value;
});

// Add listeners for Sound 2's UI
document.getElementById("frequencySlider-2").addEventListener("input", (e) => {
  document.getElementById("frequencyValue-2").textContent = e.target.value;
});
document.getElementById("gainSlider-2").addEventListener("input", (e) => {
  document.getElementById("gainValue-2").textContent = e.target.value;
});

document.getElementById("osc1").addEventListener("click", () => {
  const gain = parseFloat(document.getElementById("gainSlider-1").value);
  const frequency = parseFloat(
    document.getElementById("frequencySlider-1").value
  );
  const type = document.getElementById("waveType-1").value;
  play({ gain, frequency, type });
});

document.getElementById("osc2").addEventListener("click", () => {
  const gain = parseFloat(document.getElementById("gainSlider-2").value);
  const frequency = parseFloat(
    document.getElementById("frequencySlider-2").value
  );
  const type = document.getElementById("waveType-2").value;
  play({ gain, frequency, type });
});

document.getElementById("both").addEventListener("click", () => {
  const gain1 = parseFloat(document.getElementById("gainSlider-1").value);
  const frequency1 = parseFloat(
    document.getElementById("frequencySlider-1").value
  );
  const type1 = document.getElementById("waveType-1").value;

  const gain2 = parseFloat(document.getElementById("gainSlider-2").value);
  const frequency2 = parseFloat(
    document.getElementById("frequencySlider-2").value
  );
  const type2 = document.getElementById("waveType-2").value;

  // Play both sounds simultaneously without phase inversion.
  play({ gain: gain1, frequency: frequency1, type: type1 });
  play({ gain: gain2, frequency: frequency2, type: type2 });
});
