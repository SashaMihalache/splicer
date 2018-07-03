import './styles.scss';
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
  this.innerHTML = '&#9616;&nbsp;&#9612;'
  new Engine(120, sequenceMatrix); //BPM and samplelist
}
