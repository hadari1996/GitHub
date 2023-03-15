import React, { useEffect ,FC, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "./Card"

interface BreedCardProps {
    listBreeds: string[];
    
}


// const navigate = useNavigate();
// if(!breed) navigate("/Page404")

const BreedCard:FC<BreedCardProps> = ({listBreeds}) => {
    const { breed } = useParams();
const [breedImg, setBreedImg] =  useState<string>();
async function handleRenderImgDog(){
   const { data } = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
    try{
        setBreedImg(data.message);
    }
    catch(error){
        console.log(error);
    }
}

  useEffect(()=>{

    handleRenderImgDog();
    console.log("hello from useEffect")
}, [])
  return <div className="boxBreedImg">
    <div className="breedImg">
    <h1>{breed}</h1>
    <img src={breedImg} alt="" />
    </div>
    </div>
};


export default BreedCard;
