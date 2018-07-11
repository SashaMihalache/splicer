import './styles.scss';
import Engine from './splicer/engine';

const playButton = document.querySelector('button');
const sequenceMatrix = {
  "src/audio/kick.wav": ['x', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-'],
  "src/audio/snare.wav": ['-', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-'],
  "src/audio/hihat.wav": ['-', '-', '-', '-', 'x', '-', '-', '-', 'x', '-', 'x', '-', 'x', '-', 'x', '-'],
}
let isPlaying = false;

playButton.addEventListener('click', handlePlayToggle);

const SplicerEngine = new Engine(120, sequenceMatrix);

SplicerEngine.init();

function handlePlayToggle() {
  this.innerHTML = isPlaying ? '&#9654;' : '&#9616;&nbsp;&#9612;'
  isPlaying = !isPlaying;

  SplicerEngine.playPattern(isPlaying);
}