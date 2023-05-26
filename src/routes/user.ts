import { Router } from "express";
import UserValidator from "../validators/user";
import RequestBodyMiddleware from "../middlewares/requestbody";
import UserController from "../controllers/user";
// import UserServices from "../services/user";
// import UserRepository from "../repository/user";

// const userRepository = new UserRepository();
// const userServices = new UserServices()
const userController = new UserController();
// console.log(userRepository, userServices.login({"email": "vcaleb01@gamil.com",
// "password": "tinoooo"}), userController)

const router = Router();

router.route("/register").post(RequestBodyMiddleware.validate(UserValidator.register()), userController.register);
router.route("/login").post(RequestBodyMiddleware.validate(UserValidator.login()), userController.login);

export default router;