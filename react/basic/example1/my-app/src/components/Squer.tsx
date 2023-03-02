import React from "react";
import { useState } from "react";


const Squer=()=>{
const [colour, setColour]=  useState<string>(`black`);
 function handleChangeColour(){
    setColour(get_rand_color());
 }



return (
    <div>
    
      <div onClick={handleChangeColour} style={{ backgroundColor: colour,
                    width:'100px',
                    height:'100px' }}></div>
    </div>
  );
};



function get_rand_color()
{
    let rgb = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
    while(rgb.length < 6) {
        rgb = "0" + rgb;
    }
    return "#" + rgb;
}

export default Squer;