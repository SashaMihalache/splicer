window.Splicer = {};

var context, bufferLoader;
const sampleList = [
  "src/audio/kick.wav",
  "src/audio/snare.wav",
  "src/audio/hihat.wav",
];
const playButton = document.querySelector('button');

playButton.addEventListener('click', init);

function init() {
  new Splicer.Engine(100, sampleList); //BPM and samplelist
}



