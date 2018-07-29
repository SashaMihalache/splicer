import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multiparty from 'multiparty';
import FormData from 'form-data';
import {
  ab2str, str2ab, ab2b, b2ab,
} from './helper';

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

app.get('/audio/:id', (req, res) => {
  const { id } = req.params;
  db.getSound(id).then((result) => {
    const arrayBuffer = b2ab(result);
    const stringBuffer = ab2str(arrayBuffer);
    res.json({ data: stringBuffer });
  });
});

app.post('/audio/upload', (req, res) => {
  const form = new multiparty.Form();

  form.on('error', (error) => {
    console.log(error);
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
    }

    const arrayBuffer = str2ab(fields.audio[0]);
    const buffer = ab2b(arrayBuffer);

    db.handleUpload(buffer).then(() => {
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  db.connect();
  console.log(`Listening on port ${PORT}...`);
});
