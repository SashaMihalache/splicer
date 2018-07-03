class BufferLoader {
  constructor(context, urlList) {
    this.context = context;
    this.urlList = urlList;
  }

  async loadAllBuffers() {
    return new Promise(resolve => {

      const promises = [];
      for (let i = 0; i < this.urlList.length; ++i) {
        const singlePromise = this.loadBuffer(this.urlList[i], i)
        promises.push(singlePromise);
      }

      Promise.all(promises).then((bufferList) => {
        resolve(bufferList);
      })
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
              })
            })
            .catch(err => console.log('Error buffering', err));
        })
        .catch(err => {
          alert('Buffer Loader : Fetch Error');
        })
    });
  }

}

export default BufferLoader;