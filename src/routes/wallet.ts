import { Router } from "express";
import WalletValidator from "../validators/wallet";
import RequestBodyMiddleware from "../middlewares/requestbody";
import WalletController from "../controllers/wallet";
import AuthMiddleware from "../middlewares/auth";
// import UserServices from "../services/user";
// import UserRepository from "../repository/user";

// const userRepository = new UserRepository();
// const userServices = new UserServices()
const userController = new WalletController();
// console.log(userRepository, userServices.login({"email": "vcaleb01@gamil.com",
// "password": "tinoooo"}), userController)

const router = Router();

router.route("/mywallet").get(AuthMiddleware.authorize, userController.getMyWallet);
router.route("/transfer").post(RequestBodyMiddleware.validate(WalletValidator.transfer()), AuthMiddleware.authorize, userController.transfer);
router.route("/fund").post(RequestBodyMiddleware.validate(WalletValidator.fund()), AuthMiddleware.authorize, userController.fund);
router.route("/verifyfunds").get(AuthMiddleware.checkParams, userController.verifyPayment);

export default router;