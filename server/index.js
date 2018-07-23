import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors('http://localhost:8080'));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
