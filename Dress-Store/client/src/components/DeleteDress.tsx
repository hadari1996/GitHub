import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getUserByCookie } from "../features/user/userAPI";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import Dress from "../types/dress";
import { Navbar } from "./Navbar";
import "../style/updateDelAdd.scss";

export const DeleteDress = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [values, setValues] = useState({
    nameDress: "",
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

  const handleValidation = () => {
    const { nameDress } = values;
    if (nameDress === "") {
      toast.error("Please enter name dress", toastOptions);
      return false;
    }
    return nameDress;
  };

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const deleteDress = async (event: any) => {
    try {
      event.preventDefault();
      const nameDress = handleValidation();
      if (nameDress) {
        let { data } = await axios.delete(
          `/api/dresses/delete-dress/${nameDress}`
        );
        const { ok, error, results } = data;
        if (!ok) throw error;
        if (error) throw error;
        else {
          alert(`${results} is deleted`);
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error, toastOptions);
    }
  };

  return (
    <>
      <Navbar componentRenderdBy="Delete" />
      <h1 className="from_header">Delete Dress</h1>
      <div className="fromUpdateDelAddWrapper">
        <form className="enter_dress" onSubmit={(event) => deleteDress(event)}>
          <input
            type="text"
            placeholder="Enter name dress to delete"
            name="nameDress"
            className="form_input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />

          <button type="submit" className="form_button">
            מחק שימלה
          </button>
        </form>

        <ToastContainer />
      </div>
    </>
  );
};
