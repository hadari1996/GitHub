"use strict";
exports.__esModule = true;
exports.UserValidation = void 0;
var mongoose_1 = require("mongoose");
var Joi_1 = require("Joi");
var joi_password_1 = require("joi-password");
var JoiPassword = Joi_1["default"].extend(joi_password_1.joiPasswordExtendCore);
// export 
var UserSchema = new mongoose_1["default"].Schema({
    email: { type: String, unique: true, required: [true, "user must have email"] },
    password: { type: String, required: [true, "user must have password"] },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});
var UserModel = mongoose_1["default"].model("users", UserSchema);
exports["default"] = UserModel;
exports.UserValidation = Joi_1["default"].object({
    email: Joi_1["default"].string().email().required(),
    password: JoiPassword
        .string()
        .min(2)
        .max(16)
        .minOfNumeric(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .required(),
    repeatPassword: Joi_1["default"].ref('password'),
    firstName: Joi_1["default"].string().required(),
    lastName: Joi_1["default"].string().required()
});
