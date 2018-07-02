var context;
var bufferLoader;
const playButton = document.querySelector('button');

playButton.addEventListener('click', loadAndPlay);

function loadAndPlay() {
  try {
    context = new AudioContext();
  }
  catch (e) {
    alert("Web Audio API is not supported in this browser");
  }

  bufferLoader = new BufferLoader(
    context,
    [
      "src/audio/kick.wav",
      "src/audio/snare.wav",
      "src/audio/hihat.wav",
    ],
    finishedLoading
  );

  bufferLoader.load();
}

function playSound(sample, time) {
  var source = context.createBufferSource();
  source.buffer = sample.buffer;
  source.connect(context.destination);
  source.start(time);
}

function finishedLoading(bufferList) {
  const kick = context.createBufferSource();
  const snare = context.createBufferSource();
  const hihat = context.createBufferSource();
  kick.buffer = bufferList[0];
  snare.buffer = bufferList[1];
  hihat.buffer = bufferList[2];

  kick.connect(context.destination);
  snare.connect(context.destination);
  hihat.connect(context.destination);

  const startTime = context.currentTime + 0.100;
  const tempo = 120; // BPM (beats per minute)
  const eighthNoteTime = (60 / tempo) / 2;

  for (let bar = 0; bar < 2; bar++) {
    const time = startTime + bar * 8 * eighthNoteTime;
    // Play the bass (kick) drum on beats 1, 5
    playSound(kick, time);
    playSound(kick, time + 4 * eighthNoteTime);

    // Play the snare drum on beats 3, 7
    playSound(snare, time + 2 * eighthNoteTime);
    playSound(snare, time + 6 * eighthNoteTime);

    // Play the hi-hat every eighth note.
    for (var i = 0; i < 8; ++i) {
      playSound(hihat, time + i * eighthNoteTime);
    }
  }
}