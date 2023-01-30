import mongoose from "mongoose";

// export 
const UserSchema= new mongoose.Schema({
    email:{type:String ,unique:true},
    password:{type:String ,required:[true, "user must have email"] }
})


const UserModel = mongoose.model("users", UserSchema);


export default UserModel