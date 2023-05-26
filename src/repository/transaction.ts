import { Types } from 'mongoose';
import { IWallet, IWalletData, IWalletTf, IWalletDataSave, ITransaction, ITransactionData } from '../interface';
import TransactionModel from '../models/transaction';

class TransactionRepository {
    async createTransaction(item: ITransaction): Promise<ITransactionData> {
        const result = await TransactionModel.create(item);
        return result;
    }

    async findByUserId(id: Types.ObjectId) : Promise<ITransactionData[]> {
        return await TransactionModel.find({userId: id});
    }

    async findByReference(reference: string) : Promise<ITransactionData | null> {
        return await TransactionModel.findOne({reference});
    }
}

export default new TransactionRepository()