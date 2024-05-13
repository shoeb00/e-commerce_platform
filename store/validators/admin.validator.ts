import Joi from "joi";
import {
    nameValidator,
    passwordValidator,
    phoneNumberValidator,
} from "./index";

export const VRegisterAdmin = Joi.object({
    name: nameValidator,
    password: passwordValidator,
    phoneNumber: phoneNumberValidator,
});
