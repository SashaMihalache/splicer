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
            )
          })
          .catch(err => console.log('Error buffering', err));
      })
      .catch(err => {
        alert('Buffer Loader : Fetch Error');
      })
  }

}

window.Splicer.BufferLoader = BufferLoader;