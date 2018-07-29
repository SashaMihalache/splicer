import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multiparty from 'multiparty';
import FormData from 'form-data';

import DbConnection from './dbConnection';

const PORT = 3000;
const app = express();
const db = new DbConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors('http://localhost:8080'));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/upload-audio', (req, res) => {
  const form = new multiparty.Form();

  // form.on('part', (part) => {
  //   if (part.filename) {
  //     // const formData = new FormData();
  //     // formData.append('thumbnail', part, { filename: part.filename, contentType: part['content-type'] });
  //     db.handleUpload(part).then(() => {
  //       res.json({ success: 'true' });
  //     });
  //   }
  // });

  form.on('error', (error) => {
    console.log(error);
  });

  form.parse(req, (err, fields, files) => {
    console.log(err, fields, files);
    if (err) {
      console.log(err);
    }

    db.handleUpload(files.audio[0]).then(() => {
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  db.connect();
  console.log(`Listening on port ${PORT}...`);
});
