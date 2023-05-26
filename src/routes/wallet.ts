import { Router } from "express";
import WalletValidator from "../validators/wallet";
import RequestBodyMiddleware from "../middlewares/requestbody";
import WalletController from "../controllers/wallet";
import AuthMiddleware from "../middlewares/auth";


const walletController = new WalletController();
const router = Router();

router.route("/mywallet").get(AuthMiddleware.authorize, walletController.getMyWallet);
router.route("/transfer").post(RequestBodyMiddleware.validate(WalletValidator.transfer()), AuthMiddleware.authorize, walletController.transfer);
router.route("/fund").post(RequestBodyMiddleware.validate(WalletValidator.fund()), AuthMiddleware.authorize, walletController.fund);
router.route("/verifyfunds").get(AuthMiddleware.checkParams, walletController.verifyPayment);

export default router;