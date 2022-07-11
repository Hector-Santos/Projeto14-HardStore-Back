import {db} from '../dbStore/mongo.js';
import { ObjectId } from 'mongodb';


/*export async function searchProduct(req, res){
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
*/

export async function getCart(req, res){
    const {_id, token} =  res.locals.token 
    const produtos = await db.collection("cart").findOne({userId:_id});
    const estoque = await db.collection("produtos").find({}).toArray();
    
    //console.log("Estoque e cart", estoque, produtos.produtos)
    let listaCompras = [];
    if(!produtos){
        res.status(200);
        return;
    }

    for(let i=0; i<estoque.length; i++){
        for(let j=0; j<produtos.produtos.length; j++){
        if(estoque[i]._id.toString() == produtos.produtos[j].produto.toString()){
            estoque[i]["qtd"] = produtos.produtos[j].quantidade;
            listaCompras.push(estoque[i])
        }
    }
}
    res.status(200).send(listaCompras);
}


export async function updateCart(req, res){
    const {id, qtd} = req.body;
    const {_id} = res.locals.token;

    const bdAtual = await db.collection("cart").findOne({userId:_id})
    const { produtos} = bdAtual;
    bdAtual.produtos.forEach(element => {
        if(element.produto == id){
            element.quantidade = qtd;
        }
    });
    
   await db.collection("cart").updateOne({userId:_id}, {$set:bdAtual})

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
    const token =  res.locals.token 
    const userId =  res.locals.userId
    const item = ObjectId(req.body.id) 
    const carrinho = await db.collection("cart").findOne({userId: userId});
    if(!carrinho){
    await db.collection("cart").insertOne({userId: userId, produtos:[{produto:item, quantidade:1}]});
    return  res.sendStatus(201)
    }else{
        await db.collection("cart").updateOne({userId: userId}, {$push: {produtos: {produto:item, quantidade:1}}})
        res.sendStatus(201)
    }

}

export async function deleteCart(req, res){
    const item = ObjectId(req.body.id);
    const token = (req.body.headers.Authorization).replace("Bearer ", '')
    console.log("ITEM APAGADO", item, token)

    const session = await db.collection("sessions").findOne({token});

    await db.collection("cart").updateOne({userId:session._id}, {$pull:{produtos:{produto:item}}})
    console.log("session", session)
}