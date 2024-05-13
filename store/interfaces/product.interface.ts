import { EProductCategory } from "../enums/productCategory.enum";

export interface IProduct {
    name: string;
    price: number;
    quantity: number;
    category: EProductCategory;
    store: string;
}
