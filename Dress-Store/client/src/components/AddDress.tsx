import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getUserByCookie } from "../features/user/userAPI";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import SizeSelector from "./SizeSelector";
import Iventory from "../types/iventory";
import { getQuantityPrice } from "../helpers/helpers";
import { Navbar } from "./Navbar";
import "../style/updateDelAdd.scss";

export const AddDress = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [quantity, setQuantity] = useState<String[]>([]);
  const [size, setSize] = useState<String[]>([]);
  const [values, setValues] = useState({
    srcDress: "",
    nameDress: "",
    priceDress: 0,
    sizeDress: 0,
    quantityDress: 0,
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

  const handleAddDress = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (handleValidation()) {
        const { srcDress, nameDress, priceDress } = values;
        let { data } = await axios.post(`/api/dresses/add-dresses`, {
          srcDress,
          nameDress,
          priceDress,
        });
        const { ok, results } = data;
        data = await axios.post(`/api/dresses/set-size-quantity/${results}`);
        if (!ok) throw new Error();
        else {
          const dress_id = results;
          await getQuantityPrice(dress_id, setSizeQuantityObject);
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.error, toastOptions);
    }
  };

  const handleValidation = () => {
    const { srcDress, nameDress, priceDress } = values;
    if (srcDress === "") {
      toast.error("Please enter image dress", toastOptions);
      return false;
    } else if (nameDress === "") {
      toast.error("Please enter name dress", toastOptions);
      return false;
    } else if (priceDress === null) {
      toast.error("Please enter price dress", toastOptions);
      return false;
    }

    return true;
  };
  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar componentRenderdBy="ADD" />
      <h1 className="from_header">Add Dress</h1>
      <div className="fromUpdateDelAddWrapper">
        <form
          className="enter_dress"
          onSubmit={(event) => handleAddDress(event)}
        >
          <input
            type="text"
            placeholder="Enter src img dress"
            name="srcDress"
            className="form_input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
          <input
            type="text"
            placeholder="Enter name dress"
            name="nameDress"
            className="form_input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
          <input
            type="number"
            placeholder="Enter price dress"
            name="priceDress"
            className="form_input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
          <button type="submit" className="form_button">
            הוסף שימלה
          </button>
        </form>
      </div>

      <div className="wrapper_inventory">
        {sizeQuantityObject?.map((element) => {
          return (
            <div className="inventory_dresses">
              {" "}
              <SizeSelector sizeQuetetyObj={element} />
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </>
  );
};
