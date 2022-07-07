import {db} from '../dbStore/mongo.js';


export async function Home(req, res){
    

    const produtos = await db.collection("produtos").find({}).toArray();

    console.table(produtos)
    res.status(200).send(produtos);
}
