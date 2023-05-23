import axios from 'axios';
import React from 'react'
import { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Iventory from '../types/iventory';
interface SizeSelectorProps {
    sizeQuetetyObj: Iventory

}

const SizeSelector:FC<SizeSelectorProps> = ({sizeQuetetyObj}) => {
    const [quantetyState, setQuantetyState] = useState<number>(0)

    useEffect(() => {
        setQuantetyState(sizeQuetetyObj.quantity)
    }, [sizeQuetetyObj.quantity])

    const handleSaveQuentity = async () =>{
        try {
            const {data} = await axios.patch(`/api/dresses/${sizeQuetetyObj.dress_id}`, {quantity:quantetyState,size_id: sizeQuetetyObj.size_id})
            const {results}= data;
            setQuantetyState(results)
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div>
        <h1>{sizeQuetetyObj.size}</h1>
        <input type="number" value={quantetyState} onInput={(ev:any) => {setQuantetyState(ev.target.value)}}/>
        <button onClick={handleSaveQuentity}>Save</button>
    </div>
  )
}

export default SizeSelector