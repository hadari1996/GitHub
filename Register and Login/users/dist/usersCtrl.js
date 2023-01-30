"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updateID = exports.addUser = exports.login = void 0;
var userModel_1 = require("./userModel");
var bcrypt_1 = require("bcrypt");
var saltRounds = 10;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, emailLogin, passwordLogin, userDB, isMatch, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, emailLogin = _a.emailLogin, passwordLogin = _a.passwordLogin;
                    return [4 /*yield*/, userModel_1["default"].findOne({ email: emailLogin })];
                case 1:
                    userDB = _b.sent();
                    if (!userDB)
                        throw new Error("User not found");
                    return [4 /*yield*/, bcrypt_1["default"].compare(passwordLogin, userDB.password)];
                case 2:
                    isMatch = _b.sent();
                    if (!isMatch)
                        throw new Error("email and password not match");
                    res.send({ ok: true, userDB: userDB });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    res.status(500).send({ error: error_1.message, ok: false });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var password, email, salt, hash, usersDB, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    password = req.body.password;
                    email = req.body.email;
                    salt = bcrypt_1["default"].genSaltSync(saltRounds);
                    hash = bcrypt_1["default"].hashSync(password, salt);
                    return [4 /*yield*/, userModel_1["default"].create({ email: email, password: hash })];
                case 1:
                    usersDB = _a.sent();
                    if (!usersDB)
                        throw new Error("no user was created");
                    // const usersDB= new UserModel({email, password});
                    // await usersDB.save;
                    // if(!usersDB) throw new Error("no user was created")
                    res.send({ success: true, usersDB: usersDB });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(500).send({ success: false, error: "User is exsits" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addUser = addUser;
function updateID(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var passwordToUpdate, salt, hash, userDB, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    passwordToUpdate = req.body.passwordToUpdate;
                    salt = bcrypt_1["default"].genSaltSync(saltRounds);
                    hash = bcrypt_1["default"].hashSync(passwordToUpdate, salt);
                    return [4 /*yield*/, userModel_1["default"].findByIdAndUpdate(req.params.id, { password: hash }, { "new": true, runValidators: true })];
                case 1:
                    userDB = _a.sent();
                    res.send({ userDB: userDB });
                    console.log(userDB);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(500).send({ error: error_3.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateID = updateID;
