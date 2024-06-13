import { Model } from "mongoose";

export interface IUser {
    [x: string]: any;
    name: string;
    email: string;
    password: string;
    phone: string; 
    address: string; 
    role: "user" | "admin"
}

export interface UserModel extends Model<IUser>{
    isUserExistsByEmail (email: string): Promise<IUser>;

    isPasswordMatched(plainTextPassword:string, hashedPassword:string): Promise<boolean>; 
}