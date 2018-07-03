import BufferLoader from './buffer-loader';

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
    const trackList = []

    bufferList.forEach(audio => {
      const track = this.context.createBufferSource();
      track.buffer = audio;
      track.connect(this.context.destination);
      trackList.push(track);
    })

    this.playPattern(trackList);
  }

  playPattern(trackList) {
    const sixteenthNoteTime = (60 / this.tempo) / 4;
    const MEASURE = 16;

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

export default Engine;

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