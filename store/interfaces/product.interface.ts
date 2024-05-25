import { EProductCategory } from "../enums/productCategory.enum";

export interface IProduct {
    _id?: string;
    name: string;
    price: number;
    quantity: number;
    category: EProductCategory;
    storeId: string;
    stock?: number;
}
