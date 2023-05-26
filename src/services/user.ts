import { IUser, IUserData, IUserRepository, IUserService } from "../interface";
import ErrorMiddleware from "../middlewares/error";
import { genSalt, hash, compare } from "bcryptjs";
import JwtUtility from "../utilities/jwt";
import UserRepository from "../repository/user";
import WalletService from "../services/wallet";
import { SHA256 } from 'crypto-js';
import { Types } from "mongoose";

class UserService implements IUserService {
    // userRepository: IUserRepository
    // constructor(_userRepository: IUserRepository) {
    //     this.userRepository = _userRepository;
    //     // console.log(_userRepository, "See")
    // }

    generateUniqueNumber(): number {
        const randomNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        const data = `${Date.now()}${randomNumber}`;
        const hashedData = SHA256(data).toString();
        const uniqueNumberString = hashedData.substr(0, 10);
        const uniqueNumber = parseInt(uniqueNumberString, 16);
      
        return uniqueNumber;
    }

    async register(body: Omit<IUser, "_id" | "accountNumber">): Promise<IUserData> {
        let user = await UserRepository.findByEmail(body.email);
        if (user) {
            ErrorMiddleware.errorHandler("user already exists", 400);
        }
        body.password = await this.hashPassword(body.password);
        
        user =  await UserRepository.createUser({...body, accountNumber: this.generateUniqueNumber()});
        await WalletService.create({ user: user._id  });
        return { 
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user._id, 
            accessToken: JwtUtility.generateToken(user._id),
            accountNumber: user.accountNumber
        };
    }

    removePassword(body: IUser) {
        let result: Partial<Pick<IUser, 'password'>> & Omit<IUser, "password"> = {...body}
        if (result.password) {
            delete result.password;
        }
        return result;
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await genSalt(10);
        return await hash(password, salt);
    }

    async getOneByEmail(email: string): Promise<IUser | null> {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            ErrorMiddleware.errorHandler("user not found", 404);
        }
        return user;
    }

    async getOneByID(id: Types.ObjectId): Promise<IUser | null> {
        const user = await UserRepository.findById(id);
        if (!user) {
            ErrorMiddleware.errorHandler("user not found", 404);
        }
        return user;
    }

    async getOneByAccountNumber(accountNumber: number): Promise<IUser | null> {
        const user = await UserRepository.findByAccountNumber(accountNumber);
        if (!user) {
            ErrorMiddleware.errorHandler("user not found", 404);
        }
        return user;
    }

    async isValidPassword( inputtedPassword: string, savedPassword: string, ): Promise<boolean> {
        return await compare(inputtedPassword, savedPassword);
    }

    async login(data: Pick<IUser, "email" | "password">): Promise<IUserData | undefined> {
        const user = await this.getOneByEmail(data.email);
        if(user){
            const validPassword = await this.isValidPassword(
                data.password,
                user.password,
            );
            if (!validPassword) {
                  ErrorMiddleware.errorHandler("Invalid email or password", 400);
            }
            // const wallet = await WalletService.getOneByUser(user._id);
            console.log(user)
            return {
                accessToken: JwtUtility.generateToken(user._id),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                _id: user._id,
                accountNumber: user.accountNumber
            };
        }
      }
}

export default new UserService();