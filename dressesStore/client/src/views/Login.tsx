import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import "../App.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getUserByCookie } from "../features/user/userAPI";
import { userSelector } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [values, setValues] = useState({
    name: "",
    password: "",
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
    if (user) {
      navigate("/dresses-store");
    }
  }, [user]);

  const handleValidation = () => {
    const { password, name } = values;
    if (name === "") {
      toast.error("Please enter user name and password", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Please enter user name and password", toastOptions);
      return false;
    }

    return true;
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (handleValidation()) {
        const { password, name } = values;
        const { data } = await axios.post(`/api/users/login`, {
          password,
          name,
        });

        const { ok, userArray, role, error } = data;
        if (error) throw error;
        if (ok && !role) {
          navigate("/dresses-store");
        } else if (ok && role) {
          navigate("/admin");
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error, toastOptions);
    }
  };

  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="FormContainer">
        <div className="fromWrapper">
          <form onSubmit={(ev) => handleOnSubmit(ev)}>
            <div className="brand">
              <h1>login</h1>
            </div>
            <input
              type="name"
              placeholder="Name"
              name="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              min="3"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />

            <button type="submit"> Login</button>
            <span>
              Don't have an accout? <Link to="/register">Register</Link>
            </span>
          </form>
        </div>
        <img
          src="https://rachelsitbon.fashion/wp-content/uploads/2022/10/WhatsApp-Image-2022-10-06-at-15.31.36.jpeg"
          alt="dress"
        />
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;
