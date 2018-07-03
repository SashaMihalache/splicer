(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
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
  constructor(tempo, sequenceMatrix) {
    this.tempo = tempo;
    this.sequenceMatrix = sequenceMatrix;
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

    const sampleListURL = Object.keys(this.sequenceMatrix);

    new BufferLoader(
      this.context,
      sampleListURL,
      (bufferList) => this.finishLoadingBuffers(bufferList)
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

  finishLoadingBuffers(bufferList) {
    const trackList = [];

    bufferList.forEach(audio => {
      const track = this.context.createBufferSource();
      track.buffer = audio;
      track.connect(this.context.destination);
      trackList.push(track);
    });

    this.playPattern(trackList);
  }

  playPattern(trackList) {
    const sixteenthNoteTime = (60 / this.tempo) / 4;

    const matrixKeys = Object.keys(this.sequenceMatrix);
    const matrixValues = matrixKeys.map(key => this.sequenceMatrix[key]);
    const MEASURE_LENGTH = matrixValues[0].length;

    let time = 0;
    for (let beat = 0; beat < MEASURE_LENGTH; beat++) {
      let pauseCounter = 0;
      for (let trackIndex = 0; trackIndex < matrixKeys.length; trackIndex++) {
        const currentValue = matrixValues[trackIndex][beat];
        if (currentValue === 'x') {
          this.playSound(trackList[trackIndex], time);
        } else {
          pauseCounter++;
        }

        if (pauseCounter === matrixKeys.length) {
          time += sixteenthNoteTime;
        }
      }

      time += sixteenthNoteTime;
    }
  }
}

  // pattern 8th
  // 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
  // k x   -   -   -   x   -   -   - 
  // s -   -   x   -   -   -   x   -
  // h x   x   x   x   x   x   x   x

  // k x - - - - - - - x - - - - - - - 
  // s - - - - x - - - - - - - x - - -
  // h x - x - x - x - x - x - x - x -
  // pattern 16th
  // <------------------------------> measure (1 measure = 4 beats = 8 8ths notes)
  // <------><------><------><------> beat (1beat = 4 8th notes)
  // <><><><><><><><><><><><><><><><> 8th

const playButton = document.querySelector('button');

const sequenceMatrix = {
  "src/audio/kick.wav": ['x', '-', '-', 'x', '-', 'x', 'x', ''],
  "src/audio/snare.wav": ['-', '-', '-', '-', 'x', '-', '-', '-'],
  "src/audio/hihat.wav": ['-', '-', 'x', '-', '-', '-', 'x', '-'],
};

playButton.addEventListener('click', handlePlayClick);

function handlePlayClick() {
  new Engine(120, sequenceMatrix); //BPM and samplelist
}
//# sourceMappingURL=bundle.js.map
