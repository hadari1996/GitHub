import React, { useEffect } from 'react'
import { getUserByCookie } from '../features/user/userAPI';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Link, useNavigate } from "react-router-dom";
import { userSelector } from '../features/user/userSlice';
import Login from './Login';
import { Navbar } from './../components/Navbar';

export const DressesStore = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(userSelector);
    useEffect(() => {
        dispatch(getUserByCookie());   
      }, []);
      useEffect(() => {
        if (!user) 
        {
          navigate("/");
      }
    }, [user]);
    


    

    //   if (!user) return <Login/>;
    //   else
  return (
    <div>Store
        <Navbar/>
    </div>
  )
}
