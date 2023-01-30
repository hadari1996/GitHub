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
console.log("connected");
function handleRegister(event) {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    event.preventDefault();
                    email = event.target.elements.email.value;
                    password = event.target.elements.password.value;
                    if (!email || !password) {
                        throw new Error("Password or email not exsits");
                        document.querySelector(".error__message").innerHTML = "Password or email not exsits";
                    }
                    return [4 /*yield*/, axios.post("/api/v1/users/register", { password: password, email: email })];
                case 1:
                    data = (_a.sent()).data;
                    console.log(data);
                    window.location.href = "./home.html";
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    document.querySelector(".error__message").innerHTML = error_1.response.data.error;
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleLogin(event) {
    return __awaiter(this, void 0, void 0, function () {
        var emailLogin, passwordLogin, data, ok, userDB, error, user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    event.preventDefault();
                    emailLogin = event.target.elements.loginEmail.value;
                    passwordLogin = event.target.elements.loginPassword.value;
                    return [4 /*yield*/, axios.post("/api/v1/users/login", { emailLogin: emailLogin, passwordLogin: passwordLogin })];
                case 1:
                    data = (_a.sent()).data;
                    ok = data.ok, userDB = data.userDB, error = data.error;
                    if (ok) {
                        window.location.href = "./home.html";
                        user = userDB.email;
                        console.log(data);
                    }
                    else
                        alert("error!");
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2);
                    document.querySelector(".error__message").innerHTML = error_2.response.data.error;
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleUpdatePassword(event) {
    return __awaiter(this, void 0, void 0, function () {
        var passwordToUpdate, userId, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    event.preventDefault();
                    passwordToUpdate = event.target.elements.passwordToUpdate.value;
                    userId = event.target.elements.id.value;
                    if (!passwordToUpdate || !userId)
                        throw new Error("Password or email not exsits");
                    return [4 /*yield*/, axios.patch("/api/v1/users/updateID/" + userId, { passwordToUpdate: passwordToUpdate })];
                case 1:
                    data = (_a.sent()).data;
                    window.location.href = "./home.html";
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    document.querySelector(".error__message").innerHTML = error_3.response.data.error;
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
