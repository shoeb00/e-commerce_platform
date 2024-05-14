import { ERoles } from "../enums/roles.enum";

export interface IUser {
    name: string;
    email: string;
    storeId?: string;
    role: ERoles;
}
