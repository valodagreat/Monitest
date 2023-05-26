import { Types } from "mongoose";
import { ITransaction, ITransactionData } from "../interface";
import ErrorMiddleware from "../middlewares/error";
import TransactionRepository from "../repository/transaction";

class TransactionService {
    async create(body: ITransaction): Promise<ITransactionData> {
        let transaction = await TransactionRepository.findByReference(body.reference);
        if (transaction) {
            ErrorMiddleware.errorHandler("Transaction already exists", 400);
        }
        return await TransactionRepository.createTransaction({...body});
        
    }

    async createWithoutRefCheck(body: ITransaction): Promise<ITransactionData> {
        return await TransactionRepository.createTransaction({...body});
        
    }

    async getMyTransactions(id: Types.ObjectId): Promise<ITransactionData[]> {
        const transaction = await TransactionRepository.findByUserId(id);
        return transaction;
    }
    async getTransactionsByRef(reference: string): Promise<ITransactionData | null> {
        const transaction = await TransactionRepository.findByReference(reference);
        return transaction;
    }
}

export default new TransactionService();