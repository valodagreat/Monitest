import { IData, IUser, IUserRepository } from '../interface';
import UserModel from '../models/user'; 

class UserRepository {
    async createUser(item: Omit<IUser, "_id">): Promise<IData> {
        const result = await UserModel.create(item);
        return result;
    }
    
    async findByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({email})
    }
}

export default new UserRepository()