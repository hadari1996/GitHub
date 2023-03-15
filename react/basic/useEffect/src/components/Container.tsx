import Card from './Card';
import Breeds from './Breeds';
import { FC } from 'react';

interface ConatinerProps {
    listBreeds: string[]
}
const Container:FC<ConatinerProps>=({listBreeds})=>{

    return(
        <div className="Container" >
            <Breeds listBreeds={listBreeds}/>

       
        </div>
    )
}

export default Container;