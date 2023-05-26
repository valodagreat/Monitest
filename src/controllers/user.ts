import { Request, Response } from "express";
import { CustomRequest, IUserService } from "../interface";
import userService from "../services/user";

class UserController {
    // userService: IUserService
    // constructor(_userService: IUserService) {
    //     this.userService = _userService;
    //     // console.log(_userService, "See Service")
    // }

    /**
     * @author Valentine
     * @method  POST - register
     * @desc Feature: signs up the user
     * @param {object} req Request object
     * @param {object} res Response object
     * @returns {object} Json data
     */
    async register(req: Request, res: Response): Promise<void> {
        try {
          const user = await userService.register(req.body);
          res
            .status(201)
            .send({ success: true, message: "user successfully created", data: user });
        } catch (err: any) {
          const status = err.status ? err.status : 400;
          res.status(status).send({ message: err.message, data: null });
        }
    }

    /**
     * @author Valentine
     * @method  POST - login
     * @desc Feature: signs in the user
     * @param {object} req Request object
     * @param {object} res Response object
     * @returns {object} Json data
     */
     async login(req: Request, res: Response): Promise<void> {
        try {
            const response = await userService.login(req.body);
            res.status(200).send({ success: true, message: "login successful", data: response });
        } catch (err: any) {
            const status = err.status ? err.status : 400;
            res.status(status).send({ message: err.message, data: null });
        }
     }

     /**
     * @author Valentine
     * @method  GET - verifyPayment
     * @desc Feature: validates payment after being received
     * @param {object} req Request object
     * @param {object} res Response object
     * @returns {object} Json data
     */
      async getMyself(req: CustomRequest, res: Response): Promise<void> {
        try {
          if(req.user){
            const userId = req.user._id;
            const response = await userService.getIdWithoutPassword(userId);
            res.status(200).send({ success: true, message: "Fetch sucessfully", data: response });
          }
        } catch (err: any) {
            const status = err.status ? err.status : 400;
            res.status(status).send({ message: err.message, data: null });
        }
     }

     /**
     * @author Valentine
     * @method  GET - verifyPayment
     * @desc Feature: validates payment after being received
     * @param {object} req Request object
     * @param {object} res Response object
     * @returns {object} Json data
     */
      async getByEmail(req: CustomRequest, res: Response): Promise<void> {
        try {
            const userId = req.query.email;
            const response = await userService.getEmailWithoutPassword(userId as string);
            res.status(200).send({ success: true, message: "Fetch sucessfully", data: response });
        } catch (err: any) {
            const status = err.status ? err.status : 400;
            res.status(status).send({ message: err.message, data: null });
        }
     }

     /**
     * @author Valentine
     * @method  GET - verifyPayment
     * @desc Feature: validates payment after being received
     * @param {object} req Request object
     * @param {object} res Response object
     * @returns {object} Json data
     */
      async getByAccount(req: CustomRequest, res: Response): Promise<void> {
        try {
            const userId = req.query.accountNumber;
            const response = await userService.getOneByAccountNumber(parseInt(userId as string) as number);
            res.status(200).send({ success: true, message: "Fetch sucessfully", data: response });
        } catch (err: any) {
            const status = err.status ? err.status : 400;
            res.status(status).send({ message: err.message, data: null });
        }
     }
}

export default UserController;