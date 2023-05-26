import { Router } from "express";
import TransactionController from "../controllers/transaction";
import AuthMiddleware from "../middlewares/auth";


const transctionController = new TransactionController();
const router = Router();

router.route("/mytransactions").get(AuthMiddleware.authorize, transctionController.getMyTransactions);

export default router;