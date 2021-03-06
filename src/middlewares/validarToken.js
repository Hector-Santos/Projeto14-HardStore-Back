import { db , objectid} from "../dbStore/mongo.js";


export async function validarToken(req, res, next){
    const {authorization} = req.headers
    if(!authorization) return res.sendStatus(401)
    const token = authorization.replace("Bearer ", '');
    const verifyUser = await db.collection("sessions").findOne({token});

    if(!verifyUser){
        return res.sendStatus(401);
    }

    res.locals.token = (verifyUser)|| null ;
    res.locals.userId = verifyUser._id
    next();
}