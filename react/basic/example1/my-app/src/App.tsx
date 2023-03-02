import React from 'react';
import logo from './logo.svg';
import './App.css';
import Squer from './components/Squer';
import Card from './components/Card';
import Dog from './components/Dog';
import { useState } from 'react';
import { error } from 'console';
import axios from 'axios';
const users = [
  {
    firstName: "gili",
    age: 28,
  },
  {
    firstName: "vika",
    age: 20,
  },
  {
    firstName: "hadar",
    age: 25,
  },
];

function App() {

  const [dogArray, setDogArray]= useState([])

  async function handleGetDogImages(){
    try{
      const amount= document.querySelector(`input`)?.value;
      if(Number(amount)>50) throw new Error("can't be more 50 images")
       else if(Number(amount)<1) throw new Error("no valid")
       const {data} = await axios.get(`https://dog.ceo/api/breeds/image/random/${amount}`);
       const {message}= data;
       setDogArray(message);

      
    }
    catch(error){
      console.error(error);
        }
  }


  return (
    <div className="App">
      <Squer/>
      <Squer/>
      <Squer/>
      <Squer/>
      {/* {users.map((user) => {return <Card firstName={user.firstName} />})} */}
      <input type="text" placeholder='enter your amount dog images' />
      <button onClick={handleGetDogImages}>OK</button>
      {dogArray.map((dog, index)=> {return <Dog key={index} src={dog}/>})}
    </div>
    
  );
}

export default App;
