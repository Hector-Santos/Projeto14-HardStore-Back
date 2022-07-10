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
    

    res.status(200).send(produtos.item);
}


export async function updateCart(req, res){
    const {id, qtd} = req.body;
    const {_id} = res.locals.token;

    const bdAtual = await db.collection("cart").findOne({_id})
    if(bdAtual.item){
        bdAtual.item.forEach(element => {
            if(element._id == id){
                element.quantidade = qtd;
            }
        });
    }
    
    await db.collection("cart").updateOne({_id}, {$set:{item:bdAtual.item}})

    res.status(200).send("OK")
    return
}

export async function postCompras(req, res){
    const {id, qtd} = req.body;
    const {_id} = res.locals.token;

    const bdAtual = await db.collection("cart").findOne({_id})
    //await db.collection("compras").insertOne()

    await db.collection("cart").deleteOne({"_id": ObjectId(_id)});
    await db.collection('compras').insertOne({bdAtual});

    res.status(200).send("OK");
    return
}

export async function getProdutos(req, res){

    const token =  res.locals.token 

    const produtosEstoque = await db.collection("produtos").find().toArray();
    
    res.status(200).send(produtosEstoque)
}

export async function addCart(req, res){
    const {token, _id} =  res.locals.token 
    const {item} = req.body;
    console.log("item", item)
    const bd = await db.collection("cart").findOne({"_id": ObjectId(_id)});
    if(!bd){
    await db.collection("cart").insertOne({"_id": ObjectId(_id)});

    }
    await db.collection("cart").updateOne({"_id":_id}, {$set:{item:req.body}})
    
    res.sendStatus(201)

}