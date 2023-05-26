import { Router } from "express";
import UserValidator from "../validators/user";
import RequestBodyMiddleware from "../middlewares/requestbody";
import UserController from "../controllers/user";


const userController = new UserController();
const router = Router();

router.route("/register").post(RequestBodyMiddleware.validate(UserValidator.register()), userController.register);
router.route("/login").post(RequestBodyMiddleware.validate(UserValidator.login()), userController.login);

export default router;