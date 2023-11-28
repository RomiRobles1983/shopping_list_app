import React from "react";
// import "../Style-sheets/Items.css";
import { AiFillCloseCircle } from "react-icons/ai";

function Item({ id, text, purchased, setAsPurchased, removeItem }) {
  const handleSetAsPurchased = () => {
    console.log('Setting as purchased item with id:', id);
    setAsPurchased(id);
  };

  const handleRemoveItem = () => {
    console.log('Removing item with id:', id);
    removeItem(id);
  };

  return (
    <div className={purchased ? "item-container purchased" : "item-container"}>
      <div className="item-text" onClick={handleSetAsPurchased}>
        {text}
      </div>
      <div>
        <AiFillCloseCircle className="remove-icon" onClick={handleRemoveItem} />
      </div>
    </div>
  );
}
export default Item;
