import React, { FC, SetStateAction, useEffect, useState } from "react";
import Dress from "../types/dress";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/model.scss";
import DressCard from "./DressCard";

interface DressesContainerProps {
  dresses: Dress[];
}

export const DressesContainer: FC<DressesContainerProps> = ({ dresses }) => {
  const navigate = useNavigate();
  const [clickedImg, setClickedImg] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleClick = (
    src: SetStateAction<string>,
    index: SetStateAction<number>
  ) => {
    setCurrentIndex(index);
    setClickedImg(src);
  };

  return (
    <>
      <div className="dress_container">
        <div className="wrapper">
          {dresses &&
            dresses.map &&
            dresses.map((dress: Dress, index: number) => {
              return (
                <DressCard
                  dress={dress}
                  index={index}
                  setCurrentIndex={setCurrentIndex}
                />
              );
            })}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
