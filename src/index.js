import express from 'express';
//import router from './routes/router.js';
import dotenv from 'dotenv';
import cors from 'cors';
import {Pesquisa}  from './controllers/produtosController.js';

const server = express();
server.use(cors())
server.use(express.json());
//server.use(router);

server.get("/",);

server.get("/produtos", Pesquisa);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log('Server is listening on port 5000.');
});