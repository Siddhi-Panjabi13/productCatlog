import { Request, Response } from 'express'; 
import { IREQUEST, IUSER } from "../interfaces";
import { UserService } from "../services";
import { ErrorHandler } from '../handlers/errorHandler';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            
            let { userName, password, role } = req.body;
            const userData: IUSER = { userName, password,role };
            const user = await this.userService.createUserService(userData);
            res.status(200).json(user); 
        } catch (err:any) {
            // console.log(err,"Hi")
            if (err instanceof ErrorHandler) {
                res.status(err.statusCode).json({ message: err.message });
            }
            else if(err.errorResponse.code===11000){
                res.status(409).json({message:"Duplicate email entered." });
            }
            else{
                res.status(500).json({ message: err.message });
            }
        }
    }
    async loginUser(req: Request, res: Response): Promise<void> {
        try {
          const { userName, password } = req.body;
          const userLogin = await this.userService.loginUserService(userName, password);
          const token = userLogin.token;
          const role=userLogin.role
          
          res.json({ message: "User logged in successfully",token,role});
        } catch (err: any) {
          if (err instanceof ErrorHandler) {
            res.status(err.statusCode).json({ message: err.message });
          } else {
            res.status(500).json({ message: err.message });
          }
        }
      }
      async updateUser(req: Request, res: Response):Promise<void> {
        try {
            const  id  = req.params.id;
            const user = (req as IREQUEST).user;
            const { userName}: any = req.body;
            const updateData = { userName };
            const updatedUser = await this.userService.updateUserService(id, updateData, user);
            
            res.json(updatedUser);
        } catch (err: any) {
            if (err instanceof ErrorHandler) {
                res.status(err.statusCode).json({ message: err.message });
            }
            else if(err.errorResponse.code===11000){
                res.status(11000).json({message:"Duplicate email entered." });
            }
             else {
                res.status(500).json({ message: err.message });
            }
        }
    }
    async deleteUser(req: Request, res: Response):Promise<void> {
      try {
          const { id } = req.params;
          const user = (req as IREQUEST).user;

          const deletedUser = await this.userService.deleteUserService(id, user);
          res.json(deletedUser)
      } catch (err: any) {
          if (err instanceof ErrorHandler) {
              res.status(err.statusCode).json({ message: err.message });
          } else {
              res.status(500).json({ message: err.message });
          }
      }
  }
  async getLoggedInUser(req: Request, res: Response) {
    try {
        const user = (req as IREQUEST).user;
        if (!user) {
            throw new ErrorHandler( 404,'User not found', false);
        }
        res.send(user)
    }
    catch (error: any) {
        if (error instanceof ErrorHandler) {
            res.status(error.statusCode).json(error.message)

        } else
            res.status(500).json({ 'message': 'Internal server error' });


    }
}
async getAllUsers(req: Request, res: Response) {
    try {
       const users=await this.userService.getAllUsersService()
        if (!users) {
            throw new ErrorHandler( 404,'Users not found', false);
        }
        res.send(users)
    }
    catch (error: any) {
        if (error instanceof ErrorHandler) {
            res.status(error.statusCode).json(error.message)

        } else
            res.status(500).json({ 'message': 'Internal server error' });


    }
}
async getUserByIdController(req: Request, res: Response) {
    try {
        const { id }: any = req.params;
        const user = await this.userService.getUserById(id)
        if (!user) {
            throw new ErrorHandler( 404,'User not found', false)
        }
        res.json(user)
    }
    catch (error: any) {
        if (error instanceof ErrorHandler) {
            res.status(error.statusCode).json(error.message);
        }
        else {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}

}
