import { Router } from "express";
import UserValidator from "../validators/user";
import RequestBodyMiddleware from "../middlewares/requestbody";
import UserController from "../controllers/user";
import AuthMiddleware from "../middlewares/auth";


const userController = new UserController();
const router = Router();

router.route("/me").get(AuthMiddleware.authorize, userController.getMyself);
router.route("/bymail").get(AuthMiddleware.authorize, AuthMiddleware.checkEmailParams, userController.getByEmail);
router.route("/byaccount").get(AuthMiddleware.authorize, AuthMiddleware.checkAccountNumberParams, userController.getByAccount);
router.route("/register").post(RequestBodyMiddleware.validate(UserValidator.register()), userController.register);
router.route("/login").post(RequestBodyMiddleware.validate(UserValidator.login()), userController.login);

export default router;