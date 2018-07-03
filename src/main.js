import Engine from './splicer/engine';
let bufferLoader;
const playButton = document.querySelector('button');
const sampleList = [
  "src/audio/kick.wav",
  "src/audio/snare.wav",
  "src/audio/hihat.wav",
];

playButton.addEventListener('click', handlePlayClick);

function handlePlayClick() {
  new Engine(120, sampleList); //BPM and samplelist
}
