const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function createOscillator({ frequency = 440, type = "sine" } = {}) {
  const osc = audioCtx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  return osc;
}

function play({ gain = 1, frequency = 440, type = "sine" } = {}) {
  const osc = createOscillator({ frequency, type });
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(gain, audioCtx.currentTime);
  osc.connect(gainNode).connect(audioCtx.destination);

  osc.start();
  setTimeout(() => {
    osc.stop();
  }, 2000);
}

document.getElementById("osc1").addEventListener("click", () => {
  play({ gain: 1, frequency: 440, type: "sine" });
});
document.getElementById("osc2").addEventListener("click", () => {
  play({ gain: -1, frequency: 440, type: "sine" });
});

document.getElementById("both").addEventListener("click", () => {
  play({ gain: 1, frequency: 440, type: "sine" });
  // Set gain to -1 so wave crests align with wave troughs above
  play({ gain: -1, frequency: 440, type: "sine" });
});
