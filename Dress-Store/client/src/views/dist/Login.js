"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Login = void 0;
var react_1 = require("react");
// import styled from "styled-components";
require("../App.scss");
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var axios_1 = require("axios");
var react_router_dom_1 = require("react-router-dom");
var userAPI_1 = require("../features/user/userAPI");
var userSlice_1 = require("../features/user/userSlice");
var hooks_1 = require("../app/hooks");
exports.Login = function () {
    var navigate = react_router_dom_1.useNavigate();
    var dispatch = hooks_1.useAppDispatch();
    var user = hooks_1.useAppSelector(userSlice_1.userSelector);
    var _a = react_1.useState({
        name: "",
        password: ""
    }), values = _a[0], setValues = _a[1];
    var toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };
    react_1.useEffect(function () {
        dispatch(userAPI_1.getUserByCookie());
    }, []);
    react_1.useEffect(function () {
        if (user) {
            navigate("/dresses-store");
        }
    }, [user]);
    var handleOnSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var password, name, data, ok, userArray, role, error_2, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    event.preventDefault();
                    if (!handleValidation()) return [3 /*break*/, 2];
                    password = values.password, name = values.name;
                    return [4 /*yield*/, axios_1["default"].post("/api/users/login", {
                            password: password,
                            name: name
                        })];
                case 1:
                    data = (_a.sent()).data;
                    ok = data.ok, userArray = data.userArray, role = data.role, error_2 = data.error;
                    if (ok
                        && !role) {
                        navigate("/dresses-store");
                    }
                    else if (ok && role) {
                        navigate("/admin");
                    }
                    else if (error_2) {
                        throw new Error("" + error_2);
                    }
                    _a.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    react_toastify_1.toast.error(error_1.response.data.error, toastOptions);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleValidation = function () {
        var password = values.password, name = values.name;
        if (name === "") {
            react_toastify_1.toast.error("Please enter user name and password", toastOptions);
            return false;
        }
        else if (password === "") {
            react_toastify_1.toast.error("Please enter user name and password", toastOptions);
            return false;
        }
        return true;
    };
    var handleChange = function (event) {
        var _a;
        setValues(__assign(__assign({}, values), (_a = {}, _a[event.target.name] = event.target.value, _a)));
    };
    // if(user) return <DressesStore/> 
    // else
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "FormContainer" },
            react_1["default"].createElement("form", { onSubmit: function (ev) { return handleOnSubmit(ev); } },
                react_1["default"].createElement("div", { className: "brand" },
                    react_1["default"].createElement("h1", null, "login")),
                react_1["default"].createElement("input", { type: "name", placeholder: "Name", name: "name", onChange: function (e) {
                        return handleChange(e);
                    }, min: "3" }),
                react_1["default"].createElement("input", { type: "password", placeholder: "Password", name: "password", onChange: function (e) {
                        return handleChange(e);
                    } }),
                react_1["default"].createElement("button", { type: "submit" }, " Login"),
                react_1["default"].createElement("span", null,
                    "Don't have an accout? ",
                    react_1["default"].createElement(react_router_dom_1.Link, { to: "/register" }, "Register")))),
        react_1["default"].createElement(react_toastify_1.ToastContainer, null)));
};
exports["default"] = exports.Login;
