import React, {useState} from "react";
import "../Style-sheets/ItemForm.css";
import {v4 as uuidv4} from "uuid";

function ItemForm(props){
    
    
    // the useState hook is used to create a state variableinput and its corresponding function setInput
    const[input, setInput] = useState("");

   /* The manageChanges function is defined, which is used as an event handler for the onChange event
     of the input field (when something is typed in the form, this change will be captured).*/
    const manageChanges = e => {
       setInput(e.target.value);
    }
   /*The function manageForm is created, which is used as an event handler for the onSubmit event 
   of the form. When the user submits the form a "New Item" will be created.*/
    const manageForm = e =>{
        e.preventDefault();
        const newItem ={
            _id: uuidv4(),
            text: input,
            purchased: false
        }
        props.onSubmit (newItem);
        setInput("");
    }
    /* The function returns the form with the functions created for the onChange and on Submit events */
return(
   <form className="item-form"
    onSubmit={manageForm}>
    <input
    className="item-input"
    type="text"
    placeholder="Item to buy"
    text="text"
    value={input}// para que desaparezca el nombre del último item agregado
    onChange={manageChanges}
    />

<button className = "item-button">
Add
</button>
</form>

);
}
export default ItemForm;