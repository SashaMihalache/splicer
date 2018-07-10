import './styles.scss';
import Engine from './splicer/engine';

const playButton = document.querySelector('button');
const sequenceMatrix = {
  "src/audio/kick.wav": ['x', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-'],
  "src/audio/snare.wav": ['-', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-'],
  "src/audio/hihat.wav": ['-', '-', '-', '-', 'x', '-', '-', '-', 'x', '-', 'x', '-', 'x', '-', 'x', '-'],
}

playButton.addEventListener('click', handlePlayClick);

const SplicerEngine = new Engine(120, sequenceMatrix);
SplicerEngine.init();

function handlePlayClick() {
  this.innerHTML = '&#9616;&nbsp;&#9612;'
  SplicerEngine.playPattern();
}