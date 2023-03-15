"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Page404 = function () {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h1", null, "Page404"),
        react_1["default"].createElement("p", null,
            "Go back ",
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/" }, "Home"))));
};
exports["default"] = Page404;
