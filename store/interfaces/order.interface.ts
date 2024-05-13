import { EOrderStatus } from "../enums/orderStatus.enum";
import { IOrderProduct } from "./orderProducts.interface";

export interface IOrder {
    totalPrice: number;
    products: IOrderProduct[];
    status: EOrderStatus;
    userId: string;
}
