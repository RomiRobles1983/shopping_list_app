import React from 'react';
import "../Style-sheets/TopButton.css";

function TopButton({ buttonText, isCreateListButton, onClick }) {
  return (
    
      <button
        className={isCreateListButton ? "top-buttons create-list-button" : "top-buttons open-list-button"}
        onClick={onClick}
      >
        {buttonText}
      </button>
  
  );
}

export default TopButton;
