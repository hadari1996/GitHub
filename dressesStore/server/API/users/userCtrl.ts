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

    const query = await `SELECT * from USERS WHERE email='${name}'`;
    connection.query(query, async (error, results, fields) => {
      try {
         console.log(results[0].USER_ID )
        const matched = await bcrypt.compare(password, results[0].PASSWORD);
        if (!matched) throw new Error("User name or password incorrect");
        const cookie = { userId: results[0].USER_ID };
        const secret = process.env.SECRET;
        if (!secret) throw new Error("Couldn't load secret from .env");
        const JWTCookie = jwt.encode(cookie, secret);
        if (results[0]) {
          res.cookie("userID", JWTCookie);
          res.send({ ok: true, userArray: results[0] });
        } else res.send({ ok: false });
      } catch (error) {
        console.log(error);
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
    console.log(password, confirmPassword, name, user_Id, email, phoneNum);
    const strPassword = password.toString();
    const query = `SELECT * from users WHERE EMAIL='${email}';`;
    connection.query(query, (err, results, fields) => {
      try {
        if (err) throw err;
        console.log(results);
        if (results.length > 0) {
          if (password != confirmPassword)
            throw new Error("Password and confirmPassword are not matched");
          if (results[0].USER_ID == `${user_Id}`)
            throw new Error("userId already used");
          if (results[0].EMAIL == `${email}`)
            throw new Error("Email already used");
        }

        const { error } = UserValidation.validate({
          email,
          password,
          confirmPassword,
        });
        if (error) throw error;

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(strPassword, salt);

        const query2 = `INSERT INTO USERS (USER_ID, EMAIL, NAME , PASSWORD, PHONE_NUM)
          VALUES  (${user_Id},'${email}','${name}','${hash}', '${phoneNum}')`;
        console.log("trying second query");
        connection.query(query2, (error, results, fields) => {
          try {
            if (error) throw error;
            const cookie = { userId: results.insertId};
            const secret = process.env.SECRET;
            if (!secret) throw new Error("couldn't find secret from .env");
            const JWTCookie = jwt.encode(cookie, secret);
            res.cookie("userID", JWTCookie);
            res.send({ ok: true, message: results });
          } catch (error) {
            console.log(error);
            res.status(500).send({ ok: false, error: error });
          }
        });
      } catch (error) {
        res.status(500).send({ ok: false, error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
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
