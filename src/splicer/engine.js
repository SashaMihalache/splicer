import BufferLoader from './buffer-loader';

const MEASURE = 16;

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

    const startTime = this.context.currentTime + 0.100;
    const sixteenthNoteTime = (60 / this.tempo) / 4;

    for (let bar = 0; bar < 2; bar++) {
      const time = startTime + bar * MEASURE * sixteenthNoteTime;
      // Play the bass (kick) drum on beats 1, 5
      this.playSound(trackList[0], time);
      this.playSound(trackList[0], time + 8 * sixteenthNoteTime);

      // Play the snare drum on beats 3, 7
      this.playSound(trackList[1], time + 4 * sixteenthNoteTime);
      this.playSound(trackList[1], time + 12 * sixteenthNoteTime);

      // Play the hi-hat every eighth note.
      for (var i = 0; i < MEASURE; ++i) {
        this.playSound(trackList[2], time + i * sixteenthNoteTime);
      }
    }
  }

}

export default Engine;

  // pattern 8th
  // 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
  // k x   -   -   -   x   -   -   - 
  // s -   -   x   -   -   -   x   -
  // h x   x   x   x   x   x   x   x

  // k x - - - - - - - x - - - - - -
  // s - - - - x - - - - - - - x - -
  // h x - x - x - x - x - x - x - -
  // pattern 16th