
import Joi from 'Joi';
import {joiPasswordExtendCore } from "joi-password";
const JoiPassword= Joi.extend(joiPasswordExtendCore);

export const UserValidation= Joi.object ({
    email: Joi.string().email().required(),
    password:JoiPassword
            .string()
            .min(2)
            .max(16)
            .minOfNumeric(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .required(),
            confirmPassword: Joi.ref('password'),

})