import  express from "express";
import authRouter from "./authRouter.js";
import storeRouter from './storeRouter.js';

const App = express.Router();

App.use(authRouter);
App.use(storeRouter);

export default App;