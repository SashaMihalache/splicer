import './styles.scss';
import Engine from './splicer/engine';
import FileUploader from './upload/FileUploader';
import LoadAudio from './load-audio/LoadAudio';

// eslint-disable-next-line
const playButton = document.querySelector('button');
const uploadButton = document.getElementById('upload-button');
const fetchButton = document.getElementById('fetch-sound');

let isPlaying = false;

const SplicerEngine = new Engine(120);

SplicerEngine.init();


function handlePlayToggle() {
  this.innerHTML = isPlaying ? '&#9654;' : '&#9616;&nbsp;&#9612;';
  isPlaying = !isPlaying;

  SplicerEngine.playPattern(isPlaying);
}

playButton.addEventListener('click', handlePlayToggle);
uploadButton.addEventListener('click', FileUploader.handleUpload);
fetchButton.addEventListener('click', LoadAudio.getSound);
