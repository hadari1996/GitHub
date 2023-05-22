import express from "express";
import connection from "./DB/database";
import jwt from "jwt-simple";
const saltRounds = 10;
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser"

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// app.post("/api/create-database", (req, res) => {
//   const query = `INSERT INTO CUSTOMERS (ID, NAME, AGE, ADDRESS, EMAIL)
// 	VALUES (3, 'Israeli Yoni',25,  'Eyelon 2 Rishon Lezion', 'hadar@gmail.com'),
//     (4, 'Levi Yossi', 30, 'Eyelon 2 HOLON', 'Revital@gmail.com')`;
//   connection.query(query, (err, results, fields) => {
//     try {
//       if (err) throw err;
//       console.log(results);
//       res.send({ results, ok: true });
//     } catch (err) {
//       console.log(err);
//       res.send({ ok: false, error: err.message });
//     }
//   });
// });

import userRoutes from "./API/users/userRoutes";
app.use("/api/users", userRoutes);


import dressRoutes from "./API/dresses/dressRoutes";
app.use("/api/dresses", dressRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
