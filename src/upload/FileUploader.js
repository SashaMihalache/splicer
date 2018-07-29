class FileUploader {
  static handleUpload() {
    const audioFile = document.getElementById('file-upload').files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = (e) => {
      const formData = new FormData();
      const arrayBuffer = e.target.result;
      const strBuffer = FileUploader.ab2str(arrayBuffer);
      // const blob = new Blob([arrayBuffer]);
      formData.append('audio', strBuffer);

      fetch('http://localhost:3000/audio/upload', {
        method: 'POST',
        body: formData,
      })
        .then((res) => {
          console.log('Upload response', res);
        })
        .catch((err) => {
          console.log('Upload error', err);
        });
    };

    fileReader.readAsArrayBuffer(audioFile);
  }

  static ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }
}

export default FileUploader;
