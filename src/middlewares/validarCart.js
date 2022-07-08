import { db } from "../dbStore/mongo.js";
import {cart} from '../schemas/validateCart.js';


export async function validarCart(req, res, next){
    
    const validate = cart.validateAsync(req.body);

    if(validate.error){
        res.status(403).send(validate.error);
        return;
    }


}