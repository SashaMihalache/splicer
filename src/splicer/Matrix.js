class Matrix {
  static render(matrix) {
    const entryPoint = document.getElementById('matrix');
    const keys = this.getKeys(matrix);
    const values = keys.map(v => matrix[v])

    const leftCol = document.createElement('div');
    const rightCol = document.createElement('div');

    leftCol.classList.add('left-col');
    rightCol.classList.add('right-col');

    keys.forEach(trackName => {
      const textNode = document.createElement('div');
      textNode.classList.add('track-title');
      textNode.innerHTML = trackName;
      leftCol.appendChild(textNode);
    })

    values.forEach(track => {
      const trackLine = document.createElement('div');
      trackLine.classList.add('track-line');
      track.forEach(beat => {

        const inputNode = document.createElement('input');
        inputNode.type = 'checkbox';
        inputNode.checked = beat === 'x' ? 1 : 0;
        trackLine.appendChild(inputNode);
      })

      rightCol.appendChild(trackLine);
    })

    entryPoint.appendChild(leftCol);
    entryPoint.appendChild(rightCol);

  }

  static getKeys(matrix) {
    return Object.keys(matrix);
  }

}

export default Matrix;
