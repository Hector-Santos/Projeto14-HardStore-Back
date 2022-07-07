import {db} from '../dbStore/mongo.js';


export async function Pesquisa(req, res){
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
