import express from 'express';
import userRoutes from "./user"
import walletRoutes from "./wallet"

const router = express.Router();

router.route("/").get((req, res) => res.send("Welcome to Moni Test API."));
router.use(userRoutes)
router.use(walletRoutes)

export default router;