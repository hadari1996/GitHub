import express from "express";
import { getUserByCookie, login, logout, register } from "./userCtrl";

const router=express.Router();

router

.post('/login', login)
.post('/register', register)
.get('/get-user-by-cookie', getUserByCookie)
.get("/logout", logout)

export default router;