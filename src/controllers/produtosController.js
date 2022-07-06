import {db} from '../dbStore/mongo.js';


export async function Home(req, res){
    

    await db.collection("usuarios").insertOne(req.body);

    res.sendStatus(200);
}
