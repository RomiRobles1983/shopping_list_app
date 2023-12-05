import React from 'react';

function TopButton({ buttonText, isCreateListButton, onClick }) {// The function and props of the component are defined.
  return (
    
      <button
        className={isCreateListButton ? "top-buttons create-list-button" : "top-buttons open-list-button"}//A condtional class is created to handle styles-
        onClick={onClick}
      >
        {buttonText}
      </button>
  
  );
}

export default TopButton;
