'use strict';

class BufferLoader {
  constructor(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.isDone = callback;
    this.bufferList = [];
    this.loadCount = 0;

    this.init();
  }

  init() {
    for (let i = 0; i < this.urlList.length; ++i) {
      this.loadBuffer(this.urlList[i], i);
    }
  }

  loadBuffer(url, index) {
    fetch(url)
      .then(body => {

        body.arrayBuffer()
          .then(buffer => {

            this.context.decodeAudioData(buffer, (audio) => {
              if (!audio) alert('Error decoding file data: ' + url);

              this.bufferList[index] = audio;

              // when all buffers are loaded and decoded, callback
              if (++this.loadCount == this.urlList.length) {
                this.isDone(this.bufferList);
              }
            }
            );
          })
          .catch(err => console.log('Error buffering', err));
      })
      .catch(err => {
        alert('Buffer Loader : Fetch Error');
      });
  }

}

class Engine {
  constructor(tempo, sampleList) {
    this.tempo = tempo;
    this.sampleList = sampleList;
    this.context = null;
    this.init();
  }

  init() {
    try {
      this.context = new AudioContext();
    }
    catch (e) {
      alert("Web Audio API is not supported in this browser", e);
    }

    new BufferLoader(
      this.context,
      this.sampleList,
      (bufferList) => this.finishedLoading(bufferList)
    );
  }

  playSound(sample, time) {
    var source = this.context.createBufferSource();
    source.buffer = sample.buffer;
    source.connect(this.context.destination);
    if (!source.start) {
      source.start = source.noteOn;
    }
    source.start(time);
  }

  finishedLoading(bufferList) {
    const kick = this.context.createBufferSource();
    const snare = this.context.createBufferSource();
    const hihat = this.context.createBufferSource();
    kick.buffer = bufferList[0];
    snare.buffer = bufferList[1];
    hihat.buffer = bufferList[2];

    kick.connect(this.context.destination);
    snare.connect(this.context.destination);
    hihat.connect(this.context.destination);

    const startTime = this.context.currentTime + 0.100;
    const eighthNoteTime = (60 / this.tempo) / 2;

    for (let bar = 0; bar < 2; bar++) {
      const time = startTime + bar * 8 * eighthNoteTime;
      // Play the bass (kick) drum on beats 1, 5
      this.playSound(kick, time);
      this.playSound(kick, time + 4 * eighthNoteTime);

      // Play the snare drum on beats 3, 7
      this.playSound(snare, time + 2 * eighthNoteTime);
      this.playSound(snare, time + 6 * eighthNoteTime);

      // Play the hi-hat every eighth note.
      for (var i = 0; i < 8; ++i) {
        this.playSound(hihat, time + i * eighthNoteTime);
      }
    }
  }

}

const playButton = document.querySelector('button');
const sampleList = [
  "src/audio/kick.wav",
  "src/audio/snare.wav",
  "src/audio/hihat.wav",
];

playButton.addEventListener('click', handlePlayClick);

function handlePlayClick() {
  new Engine(100, sampleList); //BPM and samplelist
}
//# sourceMappingURL=bundle.js.map
