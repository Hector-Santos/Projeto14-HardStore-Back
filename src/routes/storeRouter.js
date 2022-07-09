import express from 'express';
import {searchProduct, getCart, updateCart} from '../controllers/produtosController.js';
import { validarCart } from '../middlewares/validarCart.js';
import { validarToken } from '../middlewares/validarToken.js';


const storeRouter = express.Router();
storeRouter.get("/search", searchProduct);
storeRouter.get("/cart",validarToken, getCart);
storeRouter.put("/cart/",validarToken, updateCart);



export default storeRouter;