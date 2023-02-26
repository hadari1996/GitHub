import React from "react";
import { useState } from "react";


const Color = () => {

  const [color, setColor] = useState("enter your color");

  function handleYourColor() {
    const inputColor = document.querySelector("input")!.value!;
    if (!inputColor) {
        setColor("Enter your color please!");
    } else {
      setColor(inputColor);
    }
  }

  return (
    <div>
      {/* <input type="color" onChange={handleYourColor}>Enter your color</input>
  
      <div style={{backgroundColor:color}}>

    </div>  */}
    </div>

  );
};

export default Color;


