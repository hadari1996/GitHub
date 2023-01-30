import  express  from "express";
import {
addUser ,
login,
updateID
} from "./usersCtrl"

const router= express.Router();

router
.post("/register", addUser)
.post("/login", login)
.patch("/updateID/:id", updateID)


export default router;
