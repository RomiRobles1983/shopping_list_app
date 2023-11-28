import React from "react";
import "../Style-sheets/BottomButton.css";


function BottomButton ({isSaveListButton, onClick}) {
  const classes = isSaveListButton ? "buttom-buttons save-list-button" : "buttom-buttons remove-list-button";
  return (
    <button
    className={classes}
    onClick={onClick}>
    { isSaveListButton ? "SAVE LIST" : "REMOVE LIST"}
    </button>
  );
}
export default BottomButton;