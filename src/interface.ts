import { Request, Response } from 'express';
import { SaveOptions, Types } from 'mongoose';

export interface IUser {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    accountNumber: number;
}

export type Data = {
    [key: string]: any;
};

export type WalletTransfer = {
    accountNumber: number;
    amount: number;
}

export interface IResponseData {
    status: number;
    message: string;
    data: Data;
}
export interface IData {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    accountNumber: number;
}

export interface IDataWPass {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    accessToken: string;
}

export interface IUserData {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    accessToken: string;
    accountNumber: number;
}

export interface IUserRepository {
    createUser(user: Omit<IUser, "_id">): Promise<IData>;
    findByEmail(id: string): Promise<IUser | null>;
}

export interface IUserService {
    register(body: Omit<IUser, "_id">): Promise<IUserData>;
    login(data: Pick<IUser, "email" | "password">): Promise<IUserData | undefined>;
    hashPassword(password: string): Promise<string>;
    getOneByEmail(email: string): Promise<IUser | null>;
    isValidPassword(inputtedPassword: string, savedPassword: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>
}

export interface IUserController {
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
}

export interface IWalletData {
    user: Types.ObjectId;
    balance: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: Types.ObjectId;
}

export interface IWalletDataSave {
    user: Types.ObjectId;
    balance: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: Types.ObjectId;
    save(options?: SaveOptions): Promise<this>;
}

export interface IWallet{
    user: Types.ObjectId;
    balance: number;
    _id: Types.ObjectId;
}

export interface IWalletTf{
    user: Types.ObjectId;
    balance: number;
}

export interface UserJWT{
    _id: Types.ObjectId;
    iat: number;
    exp: number;
}

export interface CustomRequest extends Request {
    user?: UserJWT; // Define the 'user' property
}