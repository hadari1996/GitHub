import React from "react";
import { useState } from "react";


const Birthday = () => {
    const currentYear = new Date().getFullYear();
  const [age, setAge] = useState <number | string>("enter your Birthday");

  function handleYourBirthday() {
    const birthday = prompt("enter your Birthday");
    if (!birthday) {
        setAge("Enter your Birthday please!");
    } else {
      const calcAge = Number(currentYear) - Number(birthday);
      setAge(calcAge);
    }
  }

  return (
    <div>
      <button onClick={handleYourBirthday}>Enter your name</button>
      <div>{age}</div>
    </div>
  );
};

export default Birthday;


