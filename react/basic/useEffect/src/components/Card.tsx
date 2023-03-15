import axios from "axios"
import { FC, useEffect, useState } from 'react';
import {Link} from "react-router-dom"

interface CardProps{
    src:string;
}

const Card:FC <CardProps>=({src})=>{
    const [srcImg, setsrcImg]=  useState<string>()
    async function handleRenderCardImgDog(){
        try{
            console.log(src)
        // const { data } = await axios.get(`https://dog.ceo/api/breed/hound/images`);
        const { data } = await axios.get(`https://dog.ceo/api/breed/${src}/images/random`);
        const {message}= data;
      
        setsrcImg(message);

        }
        catch(error){
            console.log(error);
        }
    }




    useEffect(()=>{
        handleRenderCardImgDog();
        console.log("hello from useEffect")
    }, [])

    return(
        <div className="Card">
            <Link to={`/breed/${src}`}>
            <img src={srcImg} alt="" />
            <h1>{src}</h1>
            </Link>
       
        </div>
    )

}

export default Card;