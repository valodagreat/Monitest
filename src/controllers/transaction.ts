import { Response } from "express";
import { CustomRequest } from "../interface";
import TransactionService from "../services/transaction";

class TransactionController {
    /**
     * @author Valentine
     * @method  GET - getMyTransactions
     * @desc Feature: gets all users transactions
     * @param {object} req Request object
     * @param {object} res Response object
     * @returns {object} Json data
     */
     async getMyTransactions(req: CustomRequest, res: Response): Promise<void> {
        try {
            if(req.user){
                const transaction = await TransactionService.getMyTransactions(req.user._id);
                res.status(200).send({ success: true, message: null, data: transaction });
            }
        } catch (err: any) {
            const status = err.status ? err.status : 400;
            res.status(status).send({ success: false, message: err.message, data: null });
        }
     }
}

export default TransactionController