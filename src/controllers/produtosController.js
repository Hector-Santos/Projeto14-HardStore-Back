import {db, objectid} from '../dbStore/mongo.js';
import lodash from 'lodash';
import { ObjectId } from 'mongodb';


export async function searchProduct(req, res){
    const {pesquisa} = req.body;

    const produtos = await db.collection("produtos").find({}).toArray();

    let listaFiltrada = produtos.filter(e=>{
        const {nome, description} = e;
        if((nome.toLowerCase()).includes(pesquisa) || (description.toLowerCase()).includes(pesquisa) ){
            return e;
        }
    })
    console.log("LISTA", listaFiltrada)
    res.status(200).send({produtos, valor:34});
}


export async function getCart(req, res){
    const {token, id} = req.headers;
    const {pesquisa} = req.body;
     const produtos = await db.collection("cart").findOne({_id: ObjectId("62c8382c5c601aac4e87f5ec")});

    let items = (produtos) && produtos.item.map(e=>{return new ObjectId(e._id)})

    const produtosEstoque = await db.collection("produtos").find({}).toArray();
    
   
    res.status(200).send(produtosEstoque);
}


export async function updateCart(req, res){

    const {_id} = res.locals.token;



    console.log("UPDATE", req.headers.authorization, _id)

    res.status(200).send("OK")
    return
}