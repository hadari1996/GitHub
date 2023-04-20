import React from 'react'
import User from '../user';
import { FC } from "react";
import Robot from "../assets/🤖 Robot Waving.gif";
import "../Welcome.scss";
interface welcomeProps {
    currentUser: User;
  }
  

 const Welcome :FC<welcomeProps>|any = ({currentUser}: {currentUser: User;}) => {
  return (
    <div  className="container3">
        <img src={Robot} alt="Robot" />
        <h1>Welcome, <span> {currentUser.name}!</span></h1>
        <h3>Please select a chat room</h3>

    </div>
  )
}


export default Welcome;
