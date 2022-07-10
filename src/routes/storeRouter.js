import express from 'express';
import {searchProduct, getCart, updateCart, postCompras, getProdutos, addCart} from '../controllers/produtosController.js';
import { validarCart } from '../middlewares/validarCart.js';
import { validarToken } from '../middlewares/validarToken.js';



const storeRouter = express.Router();
storeRouter.get("/search", searchProduct);
storeRouter.get("/cart",validarToken, getCart);
storeRouter.post("/cart",validarToken, addCart);
storeRouter.put("/cart/",validarToken, updateCart);
storeRouter.post("/compras",validarToken, postCompras);
storeRouter.get("/produtos",validarToken, getProdutos);



export default storeRouter;