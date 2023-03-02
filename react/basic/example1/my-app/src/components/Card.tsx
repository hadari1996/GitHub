import React from "react";
import { useState } from "react";
import { FC } from "react";



interface CardProps {

    firstName: string

}
const Card:FC<CardProps>=({firstName})=>{
    return(
        <div>
         <h3>Hello {firstName}</h3>
        </div>
    )
}

export default Card
