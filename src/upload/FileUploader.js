class FileUploader {
  static handleUpload() {
    const audioFile = document.getElementById('file-upload').files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = (e) => {
      const formData = new FormData();
      const arrayBuffer = e.target.result;
      const blob = new Blob([arrayBuffer]);
      formData.append('audio', blob);

      fetch('http://localhost:3000/upload-audio', {
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
}

export default FileUploader;
