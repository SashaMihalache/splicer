import './styles.scss';
import Engine from './splicer/engine';

/* eslint-disable-line */
const playButton = document.querySelector('button');
let isPlaying = false;

const SplicerEngine = new Engine(120);

SplicerEngine.init();


function handlePlayToggle() {
  this.innerHTML = isPlaying ? '&#9654;' : '&#9616;&nbsp;&#9612;';
  isPlaying = !isPlaying;

  SplicerEngine.playPattern(isPlaying);
}

playButton.addEventListener('click', handlePlayToggle);
