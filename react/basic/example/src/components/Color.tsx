import React from "react";
import { useState } from "react";

const Color = () => {
  const [color, setColor] = useState<string>("black");

  function handleYourColor(event: any) {
    setColor(event.target.value);
  }

  return (
    <div>
      <input placeholder="Enter your color" type="color" id="color" onChange={handleYourColor}/>
      <div style={{ backgroundColor: color,
                    width:'100px',
                    height:'100px' }}></div>
    </div>
  );
};

export default Color;
