import { ObjectId } from "mongodb";

export const CREATE_CUSTOMER = "CREATE_CUSTOMER";
export const READ_CUSTOMER = "READ_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";

export interface Customer {
    _id: ObjectId,
    customer_name: string,
    pet_name: string,
    pet_art: string,
    amount: number,    
}