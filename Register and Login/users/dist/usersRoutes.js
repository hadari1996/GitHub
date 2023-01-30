"use strict";
exports.__esModule = true;
var express_1 = require("express");
var usersCtrl_1 = require("./usersCtrl");
var router = express_1["default"].Router();
router
    // .get("", getAllUsers)
    // .get("/:id", getUserById)
    .post("/register", usersCtrl_1.addUser)
    .post("/login", usersCtrl_1.login);
exports["default"] = router;
