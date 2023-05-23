import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {BiPowerOff} from "react-icons/bi"
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { userSelector } from '../features/user/userSlice'
import { logout } from '../features/user/userSlice';
// import "../Logout.scss";
export const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate= useNavigate();
    const handleClick= async()=>{
        try{
            const {data}= await axios.get(`/api/users/logout`);
            const{ok}=data;
            if(ok) {
                dispatch(logout());
                navigate("/");}
        }
        catch(error){
            console.log(error);
        }
    }
  return (
    <div><button onClick={handleClick}><BiPowerOff/>
        </button></div>
  )
}
