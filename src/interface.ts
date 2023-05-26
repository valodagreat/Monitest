import { Request, Response } from 'express';
import { Types } from 'mongoose';

export interface IUser {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IData {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
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