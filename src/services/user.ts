import { IUser, IUserData, IUserRepository, IUserService } from "../interface";
import ErrorMiddleware from "../middlewares/error";
import { genSalt, hash, compare } from "bcryptjs";
import JwtUtility from "../utilities/jwt";
import UserRepository from "../repository/user";

class UserService implements IUserService {
    // userRepository: IUserRepository
    // constructor(_userRepository: IUserRepository) {
    //     this.userRepository = _userRepository;
    //     // console.log(_userRepository, "See")
    // }

    async register(body: Omit<IUser, "_id">): Promise<IUserData> {
        let user = await UserRepository.findByEmail(body.email);
        if (user) {
            ErrorMiddleware.errorHandler("user already exists", 400);
        }
        body.password = await this.hashPassword(body.password);
        user =  await UserRepository.createUser(body);
        // await WalletService.create({ user_id: user._id });
        return { 
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user._id, 
            accessToken: JwtUtility.generateToken(user._id)
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
            };
        }
      }
}

export default new UserService();