import React, { useState } from "react";

const ChangeName= ()=>{
    const [name, setName]= useState<String>("enter name");

    function handleChangeName(){
        const newName= prompt("enter your name")
        if (!newName) {
            setName("Enter Name please!");
          } else {
            setName(newName);
    }

    
}
return(
    <div>

        <button onClick={handleChangeName}>Enter your name</button>
        <div>{name}</div>
    </div>
)
}

export default ChangeName;

