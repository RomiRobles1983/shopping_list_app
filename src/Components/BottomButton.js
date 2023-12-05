import React from "react";

function BottomButton ({isSaveListButton, onClick}) {
  const classes = isSaveListButton ? "buttom-buttons save-list-button" : "buttom-buttons remove-list-button"; //2 conditional classes are created, to handle the different styles
  return (//The buttons are returned through the props that will be passed in the Home component.
    <button
    className={classes}
    onClick={onClick}>
    { isSaveListButton ? "SAVE LIST" : "REMOVE LIST"}
    </button>
  );
}
export default BottomButton;