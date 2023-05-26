import { Types } from 'mongoose';
import { IData, IUser, IUserRepository } from '../interface';
import UserModel from '../models/user'; 

class UserRepository {
    async createUser(item: Omit<IUser, "_id">): Promise<IData> {
        const result = await UserModel.create(item);
        return result;
    }

    async findById(id: Types.ObjectId) : Promise<IUser | null> {
        return await UserModel.findById(id);
    }
    
    async findByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({email})
    }

    async findByAccountNumber(accountNumber: number): Promise<IUser | null> {
        return await UserModel.findOne({accountNumber})
    }
}

export default new UserRepository()