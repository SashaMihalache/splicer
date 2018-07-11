class Matrix {
  constructor() {
    this.sequenceMatrix = {
      "src/audio/kick.wav": ['x', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-'],
      "src/audio/snare.wav": ['-', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-'],
      "src/audio/hihat.wav": ['-', '-', '-', '-', 'x', '-', '-', '-', 'x', '-', 'x', '-', 'x', '-', 'x', '-'],
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  getMatrix() {
    return this.sequenceMatrix;
  }

  render() {
    const entryPoint = document.getElementById('matrix');
    const keys = this.getKeys(this.sequenceMatrix);
    const values = keys.map(v => this.sequenceMatrix[v])

    const leftCol = document.createElement('div');
    const rightCol = document.createElement('div');

    leftCol.classList.add('left-col');
    rightCol.classList.add('right-col');

    keys.forEach(trackName => {
      const textNode = document.createElement('div');
      textNode.classList.add('track-title');
      textNode.innerHTML = trackName;
      leftCol.appendChild(textNode);
    });

    values.forEach((track, index1) => {
      const trackLine = document.createElement('div');
      trackLine.classList.add('track-line');
      track.forEach((beat, index2) => {

        const inputNode = document.createElement('input');
        inputNode.type = 'checkbox';
        inputNode.dataset.id = `${index1}-${index2}`;
        inputNode.checked = beat === 'x' ? 1 : 0;
        inputNode.addEventListener('click', this.handleToggle);
        trackLine.appendChild(inputNode);
      });

      rightCol.appendChild(trackLine);
    })

    entryPoint.appendChild(leftCol);
    entryPoint.appendChild(rightCol);

  }

  getKeys() {
    return Object.keys(this.sequenceMatrix);
  }

  getValues() {
    const keys = this.getKeys();
    return keys.map(key => this.sequenceMatrix[key]);
  }

  handleToggle(e) {
    const [firstIndex, secondIndex] = e.target.dataset.id.split('-');
    const isChecked = e.target.checked;

    const trackName = this.getKeys().find((item, index) => index === parseInt(firstIndex, 10));

    console.log(this.sequenceMatrix[trackName]);
    this.sequenceMatrix[trackName][secondIndex] = isChecked ? 'x' : '-';
    console.log(this.sequenceMatrix[trackName]);
  }

}

export default Matrix;
