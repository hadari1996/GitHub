import express from "express";
import jwt from "jwt-simple";
import bcrypt from "bcrypt";
import connection from "../../DB/database";
import { UserValidation } from "./userModel";
import { parse } from "dotenv";

export async function login(req, res) {
  try {
    const { password, name } = req.body;
    if (!name || !password)
      throw new Error("no data from client login in login");

    const query = await `SELECT * from users WHERE email='${name}'`;
    connection.query(query, async (error, results, fields) => {
      try {
        const matched = await bcrypt.compare(password, results[0].password);
        if (!matched) throw new Error("User name or password incorrect");
        const cookie = { userId: results[0].user_id };
        const secret = process.env.SECRET;
        if (!secret) throw new Error("Couldn't load secret from .env");
        const JWTCookie = jwt.encode(cookie, secret);
        if (results[0]) {
          res.cookie("userID", JWTCookie);
          res.send({ ok: true, userArray: results[0], role: results[0].role });
        } else res.send({ ok: false });
      } catch (error) {
        res.send({ ok: false, error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ ok: false, error: error.message });
  }
}

export async function register(req, res) {
  try {
    const { password, confirmPassword, name, user_Id, email, phoneNum } =
      req.body;
    const strPassword = password.toString();
    let query = `SELECT * FROM users WHERE email='${email}';`;
    connection.query(query, (error, results, fields) => {
      try {
        if (error) throw error;
        if (results.length > 0) {
          res.send({ ok: false, error: "Email already used" });
        } else {
          query = `SELECT * FROM users WHERE user_id='${user_Id}';`;
          connection.query(query, (error, results, fields) => {
            try {
              if (error) throw error;
              console.log(results);
              if (results.length > 0) {
                if (results[0].user_id == `${user_Id}`) {
                  res.send({ ok: false, error: "userId already used" });
                }
              }
              if (results.length == 0) {
                if (password != confirmPassword) {
                  res.send({
                    ok: false,
                    error: "Password and confirmPassword are not matched",
                  });
                  //   console.log(error);
                } else {
                  const { error } = UserValidation.validate({
                    email,
                    password,
                    confirmPassword,
                  });
                  if (error) {
                    console.log(error);
                    res.send({
                      ok: false,
                      error: error.message,
                    });
                  } else {
                    if (user_Id.length > 9) {
                      res.send({
                        ok: false,
                        error: "userId must be 9 Digits",
                      });
                    } else {
                      const saltRounds = 10;
                      const salt = bcrypt.genSaltSync(saltRounds);
                      const hash = bcrypt.hashSync(strPassword, salt);

                      const query2 = `INSERT INTO users (user_id, email, name , password, phone_num, role)
                VALUES  (${user_Id},'${email}','${name}','${hash}', '${phoneNum}', 0)`;

                      connection.query(query2, (error, results, fields) => {
                        try {
                          console.log(results);
                          if (error)
                            res.send({
                              ok: false,
                              error: error.message,
                            });
                          const cookie = { userId: results.insertId };
                          const secret = process.env.SECRET;
                          if (!secret)
                            throw new Error("couldn't find secret from .env");
                          const JWTCookie = jwt.encode(cookie, secret);
                          res.cookie("userID", JWTCookie);
                          res.send({ ok: true, message: results });
                        } catch (error) {
                          console.log(error);
                          res
                            .status(500)
                            .send({ ok: false, error: error.message });
                        }
                      });
                    }
                  }
                }
              }
            } catch (error) {
              res.status(500).send({ ok: false, error: error.message });
            }
          });
        }
      } catch (error) {
        res.status(500).send({ ok: false, error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ ok: false, error: error.message });
  }
}

export async function getUserByCookie(req, res) {
  try {
    const { userID } = req.cookies;
    //  console.log(userID);
    if (!userID) throw new Error("no cookie found");
    const secret = process.env.SECRET;
    if (!secret) throw new Error("couldn't find secret from .env");
    const decodedUserID = jwt.decode(userID, secret);
    // console.log(decodedUserID)
    const { userId } = decodedUserID;
    if (!userId) throw new Error("couldn`t find user from cookies");

    const query = await `SELECT * from USERS WHERE USER_ID ='${userId}'`;
    await connection.query(query, async (error, results, fields) => {
      try {
        console.log(results[0]);
        if (!results[0])
          throw new Error(`Couldn't find user id with the id: ${userId}`);
        const userDB = results[0];
        res.send({ login: true, userDB: userDB, userId });
      } catch (error) {
        res.send({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ ok: false, error: error.message });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("userID");
    res.send({ ok: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
