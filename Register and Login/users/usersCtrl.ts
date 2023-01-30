
import mongoose from "mongoose";
import UserModel from "./userModel";
import bcrypt from 'bcrypt';


const saltRounds=10;
  export async function login(req,res){
    try {
      const {emailLogin, passwordLogin}= req.body; 
      const userDB=  await UserModel.findOne({email:emailLogin})
      
      if(!userDB)
        throw new Error("User not found")
      const isMatch = await bcrypt.compare(passwordLogin, userDB.password); //return boolean
        if(!isMatch)  throw new Error("email and password not match")
          res.send({ok:true, userDB} )
    } catch (error) {
      res.status(500).send({error:error.message, ok:false})
    }
  }
 

  export async function addUser(req, res){
    try{

        const {password}= req.body;
        const {email}= req.body;
        const salt= bcrypt.genSaltSync(saltRounds);
        const hash= bcrypt.hashSync(password,salt)
        const usersDB= await UserModel.create({email:email, password:hash})
        if(!usersDB) throw new Error("no user was created")

        // const usersDB= new UserModel({email, password});
        // await usersDB.save;
        // if(!usersDB) throw new Error("no user was created")
   
        res.send({success:true, usersDB})


    }
    catch(error){

         res.status(500).send({success:false ,error: "User is exsits"});
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
