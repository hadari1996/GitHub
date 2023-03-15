"use strict";
exports.__esModule = true;
var Breeds_1 = require("./Breeds");
var Container = function (_a) {
    var listBreeds = _a.listBreeds;
    return (React.createElement("div", { className: "Container" },
        React.createElement(Breeds_1["default"], { listBreeds: listBreeds })));
};
exports["default"] = Container;
