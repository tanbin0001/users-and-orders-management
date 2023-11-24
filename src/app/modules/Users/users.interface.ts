import { Model } from "mongoose";


export type TFullName = {
    firstName: string;
    lastName:string;
}



export type TProduct = {
    productName : string;
    price: number;
    quantity: number;

}


export type TAddress = {
    street: string;
        city:string;
        country:string;
}

export type TUser  = {
    userId : number;
    username:string;
    password:string;
    fullName:TFullName;
    age:number;
    email:string;
    isActive: boolean;
    hobbies: string[];
    address:TAddress;
    orders?: TProduct[];
}


export type UserMethod = {
    // eslint-disable-next-line no-unused-vars
    isUserExists(userId: number) : Promise <TUser| null>;
}

export type UserModel = Model<TUser, Record<string, never>, UserMethod>