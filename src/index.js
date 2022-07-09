import express from 'express';
import App from './routes/router.js';
import cors from 'cors';

const server = express();

server.use(cors())
server.use(express.json());

server.use(App);

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log('Server is listening on port 5000.');
});