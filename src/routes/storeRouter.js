import express from 'express';
import {searchProduct, getCart, updateCart,getProdutos} from '../controllers/produtosController.js';
import { validarCart } from '../middlewares/validarCart.js';
import { validarToken } from '../middlewares/validarToken.js';



const storeRouter = express.Router();
storeRouter.get("/search", searchProduct);
storeRouter.get("/cart",validarToken, getCart);
storeRouter.put("/cart/",validarToken, updateCart);
storeRouter.get("/produtos",validarToken, getProdutos);



export default storeRouter;