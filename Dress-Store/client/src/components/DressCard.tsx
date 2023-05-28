import React, {
  SetStateAction,
  useState,
  useEffect,
  ReactEventHandler,
} from "react";
import Dress from "../types/dress";
import Model from "./Model";
import "react-toastify/dist/ReactToastify.css";
import "../style/dressCard.scss";
import { FC } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { getUserByCookie } from "../features/user/userAPI";

interface DressProps {
  dress: Dress;
  index: number;
  setCurrentIndex: CallableFunction;
}

const DressCard: FC<DressProps> = ({ dress, index, setCurrentIndex }) => {
  const [clickedImg, setClickedImg] = useState("");
  const [sizes, setSizes] = useState<any[]>();
  const [values, setValues] = useState({
    nameDress: "",
    sizes: 0,
  });
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const handleClick = (
    src: SetStateAction<string>,
    index: SetStateAction<number>
  ) => {
    setCurrentIndex(index);
    setClickedImg(src);
  };
  const handleSelect = (e: any) => {
    setValues({
      ...values,
      nameDress: e.target.form.name,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetAvilableSizes = async () => {
    try {
      const { data } = await axios.get(`/api/dresses/${dress.dress_id}/sizes`);
      if (data.error) throw data.error;
      const { sizeArr } = data;
      setSizes(sizeArr);
    } catch (error) {
      console.error(error);
    }
  };
  const addToCart = async (event: any) => {
    try {
      event.preventDefault();
      const { nameDress, sizes } = values;
      const { data } = await axios.post(
        `/api/dresses/add-cart-dress/${nameDress}`,
        {
          sizes,
          user,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  useEffect(() => {
    handleGetAvilableSizes();
  }, []);
  return (
    <>
      <div className="wrapper_Img" key={index}>
        <img
          src={dress.img}
          alt={dress.dress_name}
          onClick={() => handleClick(dress.img!, index)}
        />
        <div className="wrapper_Name_Price">
          <div className="container_name_price">
          <h2 className="dress_price">{dress.dress_price}</h2>
          <h3 className="dress_name">{dress.dress_name}</h3>
          </div>
          <form
            name={dress.dress_name}
            onSubmit={(event: React.BaseSyntheticEvent) => {
              addToCart(event);
            }}
          >
            <select
              name="sizes"
              className="size_option"
              onChange={(event: any) => handleSelect(event)}
            >
              {sizes?.map((size, index) => {
                return (
                  <>
                    <option className="option" value={size.size} key={index}>
                      {size.size}
                    </option>
                  </>
                );
              })}
            </select>
            <button className="dress_card_submit" type="submit">
              ADD
            </button>
          </form>
        </div>
      </div>
      {clickedImg && (
        <Model clickedImg={clickedImg} setClickedImg={setClickedImg} />
      )}
    </>
  );
};

export default DressCard;
