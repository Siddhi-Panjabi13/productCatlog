import express,{Request,Response} from 'express'
const router=express.Router();
import {UserController} from '../controllers'
import {UserService} from '../services'
import {verifyLogin} from '../middleware/verifylogin'
const userService=new UserService()
const userController=new UserController(userService);

router.post('/createUser',(req:Request,res:Response)=>userController.createUser(req,res));
router.get('/getLoggedInUser',verifyLogin,(req:Request,res:Response)=>userController.getLoggedInUser(req,res));
router.get('/getAllUsers',verifyLogin,(req:Request,res:Response)=>userController.getAllUsers(req,res));

router.post('/loginUser',(req:Request,res:Response)=>userController.loginUser(req,res));
router.get('/getUserById/:id',verifyLogin,(req:Request,res:Response)=>userController.getUserByIdController(req,res));
router.put('/updateUser/:id',verifyLogin,(req:Request,res:Response)=>userController.updateUser(req,res));
router.delete('/deleteUser/:id',verifyLogin,(req:Request,res:Response)=>userController.deleteUser(req,res));
export default router;