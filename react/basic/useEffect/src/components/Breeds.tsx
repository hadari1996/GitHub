import axios from "axios"
import { FC, useEffect, useState } from 'react';
import Card from './Card';

interface BreedsProps {
    listBreeds: string[]
}

const Breeds:FC<BreedsProps>=({listBreeds})=>{

    // const [listBreeds, setListBreeds]=  useState<string[]>([''])
//     async function handleApiDogList(){
//         try{
            
//                 const { data } = await axios.get(`https://dog.ceo/api/breeds/list/all`);
//                 const breeds: string[]= Object.keys(data.message);
//                 // const {message}= data;
//                 console.log(breeds);
//                 setListBreeds(breeds);
            
//             }
    
//     catch(error){
//         console.error(error);
//     }
// }
//     useEffect(()=>{
//         handleApiDogList();
//         console.log("hello from useEffect")
//     }, [])



    return(
        <div className="breeds">
            {listBreeds.map((item, index)=>{
          
                    return <Card  key={index} src={item} />
                // <img src={(item)} alt="" key={index}/>
            })}

       
        </div>
    )


}

export default Breeds