// console.log("hello");

// // Check for browser compatibility
// const AudioContext = window.AudioContext || window.webkitAudioContext;
// const audioCtx = new AudioContext();

// // Create the first oscillator (a positive sine wave)
// const oscillator1 = audioCtx.createOscillator();
// oscillator1.type = "sine";
// oscillator1.frequency.setValueAtTime(440, audioCtx.currentTime);

// // Create the second oscillator (a negative sine wave)
// const oscillator2 = audioCtx.createOscillator();
// oscillator2.type = "sine";
// oscillator2.frequency.setValueAtTime(440, audioCtx.currentTime);

// // Create a gain node to invert the second oscillator's wave
// const gainNode = audioCtx.createGain();
// gainNode.gain.setValueAtTime(-1, audioCtx.currentTime);

// // Connect everything together
// oscillator1.connect(audioCtx.destination);
// oscillator2.connect(gainNode).connect(audioCtx.destination);

// // Start the oscillators
// oscillator1.start();
// oscillator2.start();

// // Stop them after a few seconds
// setTimeout(() => {
//   oscillator1.stop();
//   oscillator2.stop();
// }, 2000);

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
