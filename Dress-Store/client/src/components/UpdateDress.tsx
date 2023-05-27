
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getUserByCookie } from "../features/user/userAPI";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import Dress from "../types/dress";
import Iventory from "../types/iventory";
import { getQuantityPrice } from "../helpers/helpers";
import SizeSelector from "./SizeSelector";
import { Navbar } from "./Navbar";
import "../style/updateDelAdd.scss";

export const UpdateDress = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [dress, setDress] = useState<Dress[]>([]);
  const [values, setValues] = useState({
    nameDress: "",
  });
  const [sizeQuantityObject, setSizeQuantityObject] = useState<Iventory[]>();
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

  const getDress = async (event: any) => {
    try {
      event.preventDefault();
      const nameDress = handleValidation();
      if (nameDress) {
        const { data } = await axios.get(
          `/api/dresses/search-dress/${nameDress}`
        );
        const { ok, error } = data;
        if (!ok) throw error;
        if (error) throw error;
        const { dressesArr } = data;
        setDress(dressesArr);
        const dress_id = dressesArr[0].dress_id;

        await getQuantityPrice(dress_id, setSizeQuantityObject);
      }
    } catch (error: any) {
      alert(error);
      toast.error(error, toastOptions);
    }
  };

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar componentRenderdBy="UPDATE" />
      <h1 className="from_header">Update Dress</h1>
      <div className="fromUpdateDelAddWrapper">
        <form className="enter_dress" onSubmit={(event) => getDress(event)}>
          <input
            type="text"
            placeholder="Enter name dress"
            name="nameDress"
            className="form_input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />

          <button type="submit"
           className="form_button">עדכן שימלה</button>
        </form>
      </div>
      <div className="wrapper_inventory">
    
        {sizeQuantityObject?.map((element) => {
          return   <div className="inventory_dresses"><SizeSelector sizeQuetetyObj={element} />
           </div>;
        })}
     
      </div>

      <ToastContainer />
    </>
  );
};