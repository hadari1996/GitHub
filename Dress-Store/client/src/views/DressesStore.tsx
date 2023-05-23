import React, { useEffect, useState } from "react";
import { getUserByCookie } from "../features/user/userAPI";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { userSelector } from "../features/user/userSlice";
import { Navbar } from "./../components/Navbar";
import { DressesContainer } from "./../components/DressesContainer";
import Dress from "../types/dress";
import axios from "axios";
import { toast } from "react-toastify";

export const DressesStore = () => {
  const [dresses, setDresses] = useState<Dress[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const getAllDresses = async () => {
    try {
      const { data } = await axios.get(`/api/dresses/get-all-dresses`);
      const ok = { data };
      if (!ok) throw new Error();
      const { dressesArr } = data;
      setDresses(dressesArr);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.response.data.error, toastOptions);
    }
  };
  useEffect(() => {
    getAllDresses();
  }, []);


  return (
    <div>
      <Navbar componentRenderdBy="STORE" setDresses={setDresses}/>
      <DressesContainer dresses={dresses}/>
    </div>
  );
};
