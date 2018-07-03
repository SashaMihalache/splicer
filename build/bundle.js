(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
'use strict';

class BufferLoader {
  constructor(context, urlList) {
    this.context = context;
    this.urlList = urlList;
  }

  async loadAllBuffers() {
    return new Promise(resolve => {

      const promises = [];
      for (let i = 0; i < this.urlList.length; ++i) {
        const singlePromise = this.loadBuffer(this.urlList[i], i);
        promises.push(singlePromise);
      }

      Promise.all(promises).then((bufferList) => {
        resolve(bufferList);
      });
    })
  }

  loadBuffer(url, index) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(body => {

          body.arrayBuffer()
            .then(buffer => {

              this.context.decodeAudioData(buffer, (audio) => {
                if (!audio) alert('Error decoding file data: ' + url);

                resolve(audio);
              });
            })
            .catch(err => console.log('Error buffering', err));
        })
        .catch(err => {
          alert('Buffer Loader : Fetch Error');
        });
    });
  }

}

class Engine {
  constructor(tempo, sequenceMatrix) {
    this.tempo = tempo;
    this.sequenceMatrix = sequenceMatrix;
    this.context = null;
  }

  async init() {
    try {
      this.context = new AudioContext();
    }
    catch (e) {
      alert("Web Audio API is not supported in this browser", e);
    }

    const sampleListURL = Object.keys(this.sequenceMatrix);
    const bufferLoader = new BufferLoader(this.context, sampleListURL);
    const bufferList = await bufferLoader.loadAllBuffers();
    const trackList = this.createTrackChannels(bufferList);
    this.playPattern(trackList);
  }

  createTrackChannels(bufferList) {
    const trackList = [];

    bufferList.forEach(audio => {
      const track = this.context.createBufferSource();
      track.buffer = audio;
      track.connect(this.context.destination);
      trackList.push(track);
    });

    return trackList;
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

  playSound(sample, time) {
    var source = this.context.createBufferSource();
    source.buffer = sample.buffer;
    source.connect(this.context.destination);
    if (!source.start) {
      source.start = source.noteOn;
    }
    source.start(time);
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

const SplicerEngine = new Engine(120, sequenceMatrix);

function handlePlayClick() {
  this.innerHTML = '&#9616;&nbsp;&#9612;';
  SplicerEngine.init();
}
//# sourceMappingURL=bundle.js.map
