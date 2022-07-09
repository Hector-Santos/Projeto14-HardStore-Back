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
    console.log(req.body)
    const {id, qtd} = req.body;
    const {_id} = res.locals.token;

    const bdAtual = await db.collection("cart").findOne({_id})

    bdAtual.item.forEach(element => {
        if(element._id == id){
            console.log("SHDUAIDGSAIUD");
            element.quantidade = qtd;
        }
    });
    await db.collection("cart").updateOne({_id}, {$set:{item:bdAtual.item}})

    res.status(200).send("OK")
    return
}