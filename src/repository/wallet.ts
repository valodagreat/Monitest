import { Types } from 'mongoose';
import { IWallet, IWalletData, IWalletTf, IWalletDataSave } from '../interface';
import WalletModel from '../models/wallet'; 

class WalletRepository {
    async createWallet(item: Omit<IWallet, "_id" | "balance">): Promise<boolean> {
        const result = await WalletModel.create(item);
        return !!result;
    }
    
    async findByUser(user: Types.ObjectId): Promise<IWalletData | null> {
        return await WalletModel.findOne({user})
    }

    async findByUserWithSave(user: Types.ObjectId): Promise<IWalletDataSave | null> {
        return await WalletModel.findOne({user})
    }

    async updateWallet(user: IWalletTf): Promise<IWalletData | null> {
        return await WalletModel.findOneAndUpdate({user: user.user}, { balance: user.balance},{
            new: true
        })
    }
}

export default new WalletRepository()