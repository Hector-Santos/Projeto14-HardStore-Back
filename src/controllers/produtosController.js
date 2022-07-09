import {db} from '../dbStore/mongo.js';
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
    const token =  res.locals.token 
    const produtos = await db.collection("cart").findOne({"_id":token._id});

    let itens = (produtos) && produtos.item.map(e=>{return e._id})

    const produtosEstoque = await db.collection("produtos").find().toArray();
    
    produtosEstoque.forEach(element => {
        if((element._id)=="62c70236430d18a2f4292138"){console.log(1)}
    });

    let itensCart = [];

    for (let i = 0; i < itens.length; i++) {
        for (let j = 0; j < produtosEstoque.length; j++) {
            if(produtosEstoque[j]._id == itens[i]){
                console.log(produtos.item[i].quantidade)
                produtosEstoque[j]['qtd'] = produtos.item[i].quantidade;
                itensCart.push(produtosEstoque[j]);
            }
        }
        
    }



    res.status(200).send(itensCart);
}


export async function updateCart(req, res){

    const {_id} = res.locals.token;



    console.log("UPDATE", req.headers.authorization, _id)

    res.status(200).send("OK")
    return
}