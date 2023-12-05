import React from "react";
import ItemList from '../Components/ItemList';

function CreateList() {
  const onListNameChange = (newName) => {//Used to define the name of the list through the changes in the variable

    console.log('New List Name:', newName);
  };

  return (// Render the ItemList component with some props//Use de funcion onListNameChange like a prop for the ListName component.
    <div className="CreateList">

      <ItemList listName="" items={[]} onListNameChange={onListNameChange} />
    </div>
 
  );
}

export default CreateList;