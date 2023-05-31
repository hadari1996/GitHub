import React, { FC, useEffect, useState } from "react";
import "../style/cart.scss";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { getUserByCookie } from "../features/user/userAPI";
import axios from "axios";
import { toast } from "react-toastify";
interface CartProps {
  display: string;
}

const Cart: FC<CartProps> = ({ display }) => {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [dressCart, setDressCart] = useState<String[]>([]);
  const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    handleGetAllMyDress();
  }, []);
  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);
  const handleGetAllMyDress = async () => {
    try {
      const userId = user?.user_id;
      const { data } = await axios.get(`/api/dresses/get-my-dress/${userId}`);
      const { error } = data;
      if (error) throw new error();
      const { results } = data;
      setDressCart(results);
    } catch (error: any) {
      toast.error(error.response.data.error, toastOptions);
    }
  };

  return (
    <div className="cart" style={{ display: display }}>
      {dressCart &&
        dressCart.map &&
        dressCart.map((item: any, index: number) => {
          return (
            <div className="wrap_dress_cart" key={index}>
              <div className="wrap_dress_cart__img-conatiner">
                <img
                  src={item.img}
                  alt={item.nameDress}
                />
              </div>
              <div className="dress-details">
                <h3 className="name_dress_cart">דגם:{item.dress_name}</h3>
                <h3 className="price_dress_cart">מחיר:{item.dress_price}</h3>
                <h3 className="size_dress_cart">מידה:{item.size}</h3>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Cart;
