import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function Item({ id, text, purchased, setAsPurchased, removeItem }) {//Defines the creation of the Item component with the necessary props, which will be configured in the ItemList component.
  
  //Defines two functions (handleSetAsPurchased and handleRemoveItem) that will be executed when the item's text or delete icon is clicked.
  const handleSetAsPurchased = () => {
    console.log('Setting as purchased item with id:', id);
    setAsPurchased(id);
  };

  const handleRemoveItem = () => {
    console.log('Removing item with id:', id);
    removeItem(id);
  };

  return (
// Use the conditional class "item-container purchased" if the item is marked as purchased (purchased is true).
// Clicking on the text calls the function handleSetAsPurchased and Clicking on iFillCloseCircle calls de function handleRemoveItem
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
