import Engine from './splicer/engine';
let bufferLoader;
const playButton = document.querySelector('button');

const sequenceMatrix = {
  "src/audio/kick.wav": ['x', '-', '-', 'x', '-', 'x', 'x', ''],
  "src/audio/snare.wav": ['-', '-', '-', '-', 'x', '-', '-', '-'],
  "src/audio/hihat.wav": ['-', '-', 'x', '-', '-', '-', 'x', '-'],
}

playButton.addEventListener('click', handlePlayClick);

function handlePlayClick() {
  new Engine(120, sequenceMatrix); //BPM and samplelist
}
