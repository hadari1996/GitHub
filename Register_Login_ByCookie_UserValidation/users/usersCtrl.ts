
import mongoose from "mongoose";
import UserModel , {UserValidation} from "./userModel";
import bcrypt from 'bcrypt';
import jwt  from "jwt-simple";



const saltRounds=10;
  export async function login(req,res){
    try {

      const {emailLogin, passwordLogin}= req.body; 
      const userDB=  await UserModel.findOne({email:emailLogin})
      
      if(!userDB)
        throw new Error("User not found")
      const isMatch = await bcrypt.compare(passwordLogin, userDB.password); //return boolean
        if(!isMatch)  throw new Error("email and password not match")
        // res.send({ok:true, userDB} )
        const cookie={userId:userDB._id}
        const secret =process.env.SECRET;
        if(!secret) throw new Error("couldn't find secret from .env");
        const JWTCookie= jwt.encode(cookie, secret);
        if(userDB){
          res.cookie("userID" , JWTCookie);
          res.send({login:true, userDB});
        } else{
          res.send({login:false});
        }

    } catch (error) {
      res.status(500).send({error:error.message, ok:false})
    }
  }
 

  export async function addUser(req, res){
    try{

        const {password ,email, firstName, lastName ,repeatPassword}= req.body;
        if(!password|| !email|| !firstName ||!lastName || !repeatPassword)
            throw new Error("password ,email, firstName, lastName didn`t get from client in handleRegister")

        const {error}= UserValidation.validate({
          email,
          password,
          firstName,
          lastName, 
          repeatPassword
        })

        if (error) throw error;
        const salt= bcrypt.genSaltSync(saltRounds);
        const hash= bcrypt.hashSync(password,salt)
        const usersDB= await UserModel.create({email:email, password:hash, firstName:firstName, lastName:lastName})
        if(!usersDB) throw new Error("no user was created")

        // const usersDB= new UserModel({email, password});
        // await usersDB.save;
        // if(!usersDB) throw new Error("no user was created")
   
        res.send({success:true, usersDB})


    }
    catch(error){

         res.status(500).send({success:false ,error: error.message });
    }

  }


  export async function updateID(req, res) {
    try{
      const {passwordToUpdate}= req.body;
      const salt= bcrypt.genSaltSync(saltRounds);
      const hash= bcrypt.hashSync(passwordToUpdate,salt)
    const userDB= await UserModel.findByIdAndUpdate(req.params.id, {password:hash}, {new:true, runValidators:true})
    res.send({userDB});
    console.log(userDB)
    }
    catch(error){
      res.status(500).send({error:error.message});
    }
  }

  export async function getUserByCookie(req,res){
    try{
    console.log(req.cookies)
    const {userID}= req.cookies;
    const secret =process.env.SECRET;
    if(!secret) throw new Error("couldn't find secret from .env");
    const decodedUserId=   jwt.decode(userID, secret);
    const {userId}=decodedUserId;
    console.log(userID);
    if(!userID) throw new Error("couldn`t find user from cookies")

    console.log(userId);
    const userDB= await UserModel.findById(userId);
    console.log(`this 2 ${userDB}`);
    if(!userDB) throw new Error(`Couldn't find user id with the id: ${userId}`)
      res.send({login:true, userDB ,userId});
    }
    catch(error){
      res.send({error:error.message});
    }
  }


  export async function logout(req,res)  {
    try{
      res.clearCookie("userID");
      res.send({logout:true});
    }
    catch(error){
      res.status(500).send({error:error.message})
    }
  }