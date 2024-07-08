import express from 'express'
import userRouter from './user.routes';
import categoryRouter from './category.routes';
import { verifyLogin } from '../middleware/verifylogin';
import { verifyRole } from '../middleware/verifyAdmin';
const router=express.Router()

router.use('/api/users',userRouter);
router.use('/api/categories',verifyLogin,verifyRole(['Admin']),categoryRouter);

export {router}