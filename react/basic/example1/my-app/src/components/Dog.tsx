import React from "react"
import { FC } from "react"

interface DogProps{
    src:string;
}

const Dog:FC<DogProps>=({src})=>{
    return(

        <div>
            <img src={src} alt="" />
        </div>
    )
    
}

export default Dog;
