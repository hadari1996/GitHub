import axios from "axios";
import React from "react";
import { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Iventory from "../types/iventory";
import "../style/updateDelAdd.scss";

interface SizeSelectorProps {
  sizeQuetetyObj: Iventory;
}

const SizeSelector: FC<SizeSelectorProps> = ({ sizeQuetetyObj }) => {
  const [quantetyState, setQuantetyState] = useState<number>(0);

  useEffect(() => {
    setQuantetyState(sizeQuetetyObj.quantity);
  }, [sizeQuetetyObj.quantity]);

  const handleSaveQuentity = async () => {
    try {
      const { data } = await axios.patch(
        `/api/dresses/${sizeQuetetyObj.dress_id}`,
        { quantity: quantetyState, size_id: sizeQuetetyObj.size_id }
      );
      const { results } = data;
      setQuantetyState(results);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1 className="inventory_dresses_header">{sizeQuetetyObj.size}</h1>
      <input
        type="number"
        value={quantetyState}
        className="inventory_dresses_input"
        onInput={(ev: any) => {
          setQuantetyState(ev.target.value);
        }}
      />
      <button className="inventory_dresses_btn" onClick={handleSaveQuentity}>
        Save
      </button>
    </div>
  );
};

export default SizeSelector;
