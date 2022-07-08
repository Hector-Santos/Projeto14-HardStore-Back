import express from 'express';
import authRouter from './authRouter.js';
import userRouter from './userRouter.js.js';
import walletRouter from './walletRouter.js.js';



const router = express.Router();
router.use(authRouter);
router.use(userRouter);
router.use(walletRouter);


export default router;