import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

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


app.listen(PORT, () => {
  db.connect();
  console.log(`Listening on port ${PORT}...`);
});
