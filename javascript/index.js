const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function createOscillator({ frequency = 440, type = "sine" } = {}) {
  const osc = audioCtx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  return osc;
}

function play({ gain = 1, frequency, type } = {}) {
  const currentFrequency =
    frequency || parseFloat(document.getElementById("frequencySlider").value);
  const currentType = type || document.getElementById("waveType").value;

  const osc = createOscillator({
    frequency: currentFrequency,
    type: currentType,
  });
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(gain, audioCtx.currentTime);

  osc.connect(gainNode).connect(audioCtx.destination);
  osc.start();

  setTimeout(() => {
    osc.stop();
  }, 2000);
}

// Add listeners to update the displayed value when the sliders are moved
document.getElementById("frequencySlider").addEventListener("input", (e) => {
  document.getElementById("frequencyValue").textContent = e.target.value;
});

document.getElementById("gainSlider").addEventListener("input", (e) => {
  document.getElementById("gainValue").textContent = e.target.value;
});

document.getElementById("osc1").addEventListener("click", () => {
  const gain = parseFloat(document.getElementById("gainSlider").value);
  play({ gain: gain });
});

document.getElementById("osc2").addEventListener("click", () => {
  const gain = parseFloat(document.getElementById("gainSlider").value);
  play({ gain: -gain });
});

document.getElementById("both").addEventListener("click", () => {
  const gain = parseFloat(document.getElementById("gainSlider").value);

  play({ gain: gain });
  play({ gain: -gain });
});
