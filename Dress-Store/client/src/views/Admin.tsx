import React, { useEffect, useState } from "react";
import { getUserByCookie } from "../features/user/userAPI";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { DressesStore } from "./DressesStore";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { AddDress } from './../components/AddDress';
import { UpdateDress } from "../components/UpdateDress";

export const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [values, setValues] = useState({
    srcDress: "",
    nameDress: "",
    priceDress: 0,
    sizeDress: 0,
    quantityDress: 0,
  });
  const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  useEffect(() => {
    if (user && !user.role) navigate("/dresses-store");
  }, [user]);

 

  

  return (
    <>
      <AddDress/>

      <ToastContainer />
    </>
  );
};
