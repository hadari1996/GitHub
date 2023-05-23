"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Login_1 = require("./views/Login");
var store_1 = require("./app/store");
var react_redux_1 = require("react-redux");
var Register_1 = require("./views/Register");
var DressesStore_1 = require("./views/DressesStore");
var Admin_1 = require("./views/Admin");
function App() {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_redux_1.Provider, { store: store_1.store },
            react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
                react_1["default"].createElement(react_router_dom_1.Routes, null,
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/", element: react_1["default"].createElement(Login_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/register", element: react_1["default"].createElement(Register_1["default"], null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/dresses-store", element: react_1["default"].createElement(DressesStore_1.DressesStore, null) }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: "/admin", element: react_1["default"].createElement(Admin_1.Admin, null) }))))));
}
exports["default"] = App;
