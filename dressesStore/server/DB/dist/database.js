"use strict";
exports.__esModule = true;
var mysql_1 = require("mysql");
require('dotenv').config();
var sqlPassword = process.env.SQLPASSWORD;
var connection = mysql_1["default"].createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: sqlPassword,
    database: "inventory dresses",
    multipleStatements: true
});
connection.connect(function (err) {
    try {
        if (err)
            throw err;
        console.info("🔥 MySQL is connected 🛢");
    }
    catch (error) {
        console.error(error);
    }
});
exports["default"] = connection;
