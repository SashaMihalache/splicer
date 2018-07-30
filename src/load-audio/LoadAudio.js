class LoadAudio {
  static getAllSamples() {
    fetch('http://localhost:3000/audio')
      .then(body => body.json())
      .then(({ data }) => {
        const d = document.getElementsByClassName('samples-list')[0];

        data[0].forEach((sample) => {
          const sampleDiv = document.createElement('div');
          const sampleButton = document.createElement('button');
          sampleButton.innerHTML = '▶';
          sampleDiv.innerHTML = `${sample.name}`;
          sampleDiv.appendChild(sampleButton);
          sampleDiv.classList.add('playable-sample');
          sampleButton.addEventListener('click', () => {
            LoadAudio.getSound(sample.id);
          });

          d.appendChild(sampleDiv);
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  static getSound(id) {
    fetch(`http://localhost:3000/audio/${id}`)
      .then((body) => {
        console.log(body);
        body.json()
          .then(({ data }) => {
            const buffer = LoadAudio.str2ab(data);
            const ctx = new AudioContext();
            ctx.decodeAudioData(buffer, (audio) => {
              const source = ctx.createBufferSource();
              source.buffer = audio;
              source.connect(ctx.destination);
              source.start(0);
            });
          })
          .catch(err => console.log('Error buffering', err));
      })
      .catch((err) => {
        alert('Buffer Loader : Fetch Error');
      });
  }

  static str2ab(str) {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
}

export default LoadAudio;
