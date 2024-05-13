import { EOrderStatus } from "../enums/orderStatus.enum";

export interface IOrder {
    totalPrice: number;
    products: [{ quantity: number; productId: string }];
    status: EOrderStatus;
    user: string;
}
