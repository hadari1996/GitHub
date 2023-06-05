import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiPowerOff } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { logout } from "../features/user/userSlice";
import "../style/navbar.scss";
export const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const { data } = await axios.get(`/api/users/logout`);
      const { ok } = data;
      if (ok) {
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        onClick={handleClick}
        className="icons-navbar"
      >
        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
      </svg>
    </div>
  );
};
