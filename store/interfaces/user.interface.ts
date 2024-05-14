import { ERoles } from "../enums/roles.enum";

export interface IUser {
    id?: string;
    name: string;
    email: string;
    storeId?: string;
    role: ERoles;
}
