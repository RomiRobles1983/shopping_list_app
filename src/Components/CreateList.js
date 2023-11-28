import React from "react";
import ItemList from '../Components/ItemList';
//import "../Style-sheets/CreateList.css";

function CreateList() {
  const onListNameChange = (newName) => {
    // Manejar cambios en el nombre de la lista si es necesario
    // Puedes agregar lógica adicional aquí si es necesario
    console.log('New List Name:', newName);
  };

  return (
    <div className="CreateList">

      <ItemList listName="" items={[]} onListNameChange={onListNameChange} />
    </div>
 
  );
}

export default CreateList;