import React, { FC } from "react";
import "../style/model.scss";
interface ModelProps {
  clickedImg: string;
  setClickedImg: CallableFunction;
}
export const Model: FC<ModelProps> = ({
  clickedImg,
  setClickedImg,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as Element).classList.contains("dismiss")) {
      setClickedImg(null);
    }
  };

  return (
    <>
      <div className="overlay dismiss"  onClick={(event) => handleClick(event)}>
        <img src={clickedImg} alt={"bigger pic"} />
        <span className="dismiss">X</span>





      </div>
    </>
  );
};

export default Model;
