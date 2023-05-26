import { IWallet, IWalletTf, Data, IWalletDataSave, WalletTransfer } from "../interface";
import WalletRepository from "../repository/wallet";
import ErrorMiddleware from "../middlewares/error";
import { Types } from 'mongoose';
import UserRepository from "../repository/user";
import PaystackService from "./paystack"
import UserService from "../services/user";

class WalletService {
    async create(body: Omit<IWallet, "_id" | "balance">): Promise<boolean> {
        let user = await WalletRepository.findByUser(body.user);
        if (user) {
            ErrorMiddleware.errorHandler("wallet already exists for this user", 400);
        }
        return await WalletRepository.createWallet({...body});
        
    }

    async getMyWallet(id: Types.ObjectId): Promise<IWallet | undefined> {
        const wallet = await WalletRepository.findByUser(id);
        if (!wallet) {
            ErrorMiddleware.errorHandler("wallet not found", 404);
        }else{
            return wallet;
        }
    }

    async getMyWalletSave(id: Types.ObjectId): Promise<IWalletDataSave | undefined> {
        const wallet = await WalletRepository.findByUserWithSave(id);
        if (!wallet) {
            ErrorMiddleware.errorHandler("wallet not found", 404);
        }else{
            return wallet;
        }
    }

    async fund(id: Types.ObjectId, amount: number): Promise<any> {
        const user = await UserService.getOneByID(id)
        if(user){
            const payload = await PaystackService.initializePayment(user?.email, amount);
            return payload;
        }else{
            ErrorMiddleware.errorHandler("User not found", 404);
        }
    }

    async verifyPayment(reference: string): Promise<any> {
        const payload = await PaystackService.validatePayment(reference);
        const getUser = await UserService.getOneByEmail(payload?.data.customer.email)
        if(getUser){
            let wallet = await WalletRepository.findByUserWithSave(getUser?._id);
            if(wallet){
                wallet.balance+= payload?.data.amount/100
                await wallet.save();
            }
        }
        console.log(getUser, payload?.data.customer.email)
        return payload;
    }

    async transfer(userId: Types.ObjectId, data: WalletTransfer): Promise<any> {
        let senderWallet = await this.getMyWalletSave(userId);
        if (!senderWallet) {
            ErrorMiddleware.errorHandler("You don't have a wallet", 404);
        }
        let recipientInfo = await UserRepository.findByAccountNumber(data.accountNumber);
        if(!recipientInfo){
            ErrorMiddleware.errorHandler("No user with such accountNumber", 404);
        }else{
            let recipientWallet = await WalletRepository.findByUserWithSave(recipientInfo._id)
            if(!recipientWallet){
                ErrorMiddleware.errorHandler("Receiver doesn't have a wallet", 404);
            }
            if(data.amount ===0){
                ErrorMiddleware.errorHandler("Cannot transfer this amount", 400);
            }
            if(senderWallet && recipientWallet){
                if (senderWallet.balance < data.amount) {
                    ErrorMiddleware.errorHandler("Insufficient balance", 400);
                }
                senderWallet.balance -= data.amount;
                recipientWallet.balance += data.amount;
    
                await senderWallet.save();
                await recipientWallet.save();
    
                return { message: "Transfer successful" }
            }
        }
    }

    // generateUniqueNumber(id: Types.ObjectId): number {
    //     const objectIdString = id.toHexString();
    //     const objectIdInteger = parseInt(objectIdString, 16);
    //     const uniqueNumber = objectIdInteger % 10000000000; // Limit to 10 digits
    //     return uniqueNumber;
    //   }
}

export default new WalletService();