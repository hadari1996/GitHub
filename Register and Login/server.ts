
import express  from "express";
import mongoose from "mongoose";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();
const app=express();

const PORT= process.env.PORT;

app.use(express.json());
app.use(express.static('public'));

import usersRoutes from "./users/usersRoutes"

app.use("/api/v1/users/", usersRoutes )
mongoose.set('strictQuery', true);

const  mongo_uri= process.env.MONGO_URI;
mongoose.connect(mongo_uri).then(()=>{

    console.log("connected sucessfully to DB")
}).catch((error)=>{
  console.log('at mongoose connect:');
  console.log(error.message);
})


// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'hadarzocaim@gmail.com',
//     pass: 'h5d4r200!'
//   }
// });

// var mailOptions = {
//   from: 'hadarzocaim@gmail.com',
//   to: 'hdr90@windowslive.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

app.listen(PORT, ()=>{
    console.log(`server is active on PORT ${PORT}`);
})