import BufferLoader from './buffer-loader';

class Engine {
  constructor(tempo, sequenceMatrix) {
    this.tempo = tempo;
    this.sequenceMatrix = sequenceMatrix;
    this.context = null;
    this.interval = null;
    this.trackList = [];
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
    this.trackList = this.createTrackChannels(bufferList);
  }

  createTrackChannels(bufferList) {
    const trackList = []

    bufferList.forEach(audio => {
      const track = this.context.createBufferSource();
      track.buffer = audio;
      track.connect(this.context.destination);
      trackList.push(track);
    })

    return trackList;
  }

  playPattern(isPlaying) {
    const sixteenthNoteTime = (this.tempo / 60) / 32;
    const matrixKeys = Object.keys(this.sequenceMatrix);
    const matrixValues = matrixKeys.map(key => this.sequenceMatrix[key]);
    const LEN = matrixValues[0].length;
    const LOOP_TIME = LEN * sixteenthNoteTime * 1000;

    if (!isPlaying) {
      this.stop();
    } else {

      this.interval = setInterval(() => {
        let time = this.context.currentTime;
        for (let sixteenthBeat = 0; sixteenthBeat < LEN; sixteenthBeat++) {
          for (let trackIndex = 0; trackIndex < matrixKeys.length; trackIndex++) {
            const currentValue = matrixValues[trackIndex][sixteenthBeat];
            if (currentValue === 'x') {
              this.playSound(this.trackList[trackIndex], time);
            }
          }

          time += sixteenthNoteTime;
        }
      }, LOOP_TIME);
    }

  }

  playSound(sample, time) {
    const source = this.context.createBufferSource();
    source.buffer = sample.buffer;
    source.connect(this.context.destination);
    source.start(time);
  }

  start() {

  }

  stop() {
    clearInterval(this.interval);
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

  // 1 measure = 16 sixteenth notes