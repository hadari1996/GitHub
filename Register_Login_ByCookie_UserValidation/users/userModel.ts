import mongoose from "mongoose";

import Joi from 'Joi';
import {joiPasswordExtendCore } from "joi-password";

const JoiPassword= Joi.extend(joiPasswordExtendCore);
// export 
const UserSchema= new mongoose.Schema({
    email:{type:String ,unique:true ,required:[true, "user must have email"]},
    password:{type:String ,required:[true, "user must have password"]},
    firstName:{type:String ,required:true},
    lastName: {type:String,required:true }
    
})


const UserModel = mongoose.model("users", UserSchema);


export default UserModel

export const UserValidation= Joi.object({
    email: Joi.string().email().required(),
    password:JoiPassword
            .string()
            .min(2)
            .max(16)
            .minOfNumeric(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .required(),
    repeatPassword: Joi.ref('password'),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
});
