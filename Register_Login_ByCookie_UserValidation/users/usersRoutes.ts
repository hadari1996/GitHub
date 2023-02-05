import  express  from "express";
import {
addUser ,
login,
updateID,
getUserByCookie,
logout
} from "./usersCtrl"

const router= express.Router();

router
.get("/get-user-by-cookie", getUserByCookie)
.get("/logout",logout)
.post("/register", addUser)
.post("/login", login)
.patch("/updateID/:id", updateID)


export default router;
