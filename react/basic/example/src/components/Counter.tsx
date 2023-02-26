import React, { useState } from "react";

const Counter =()=>{
    const  [counter, setCounter]= useState<number>(0)

    function handleAddCounter(){
        setCounter((prevState)=>prevState+1);

    }
    function handleMinusCounter(){
        setCounter((prevState)=>prevState-1);

    }

    return(
        <div>
            <div>{counter}</div>
            <button onClick={handleAddCounter}>+</button>
            <button onClick={handleMinusCounter}>-</button>
        </div>

    )
}




export default Counter;