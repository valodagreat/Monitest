import express from 'express';
import userRoutes from "./user"

const router = express.Router();

router.route("/").get((req, res) => res.send("Welcome to Moni Test API."));
router.use(userRoutes)

export default router;