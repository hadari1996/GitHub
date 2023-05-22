import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import "../App.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { getUserByCookie } from "../features/user/userAPI";
import { DressesStore } from "./DressesStore";

export const FormContainer: any = styled.div`width:100vw; height: 100vh; display: flex; justify-content: center; align-items-center`;

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  useEffect(() => {
  if (user) 
  {
    navigate("/dresses-store");
}
}, [user]);




  const [values, setValues] = useState({
    name: "",
    user_Id: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNum: "",
  });

  const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (handleValidation()) {
        const { password, confirmPassword, name, user_Id, email, phoneNum } =
          values;

        const { data } = await axios.post(`/api/users/register`, {
          password,
          confirmPassword,
          name,
          user_Id,
          email,
          phoneNum,
   
        });

        navigate("/dresses-store");
      }
    } catch (error: any) {
      console.error(error.message);

      toast.error(error.response.data.error, toastOptions);
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, name, email } = values;
    if (password != confirmPassword) {
      toast.error(
        "Passoword and confirm password should be same.",
        toastOptions
      );

      return false;
    } else if (name.length < 3) {
      toast.error("User should be greater than 3 characters.", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  // if(user) return <DressesStore/> 
  // else
  return (
    <div className="FormContainer">
      <form onSubmit={(ev) => handleOnSubmit(ev)}>
        <div className="brand">
          <h1>Register</h1>
        </div>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="ID"
          name="user_Id"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="Phone number "
          name="phoneNum"
          onChange={(e) => handleChange(e)}
        />

        <button type="submit"> Create User</button>
        <span>
          Already have an account? <Link to="/">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
