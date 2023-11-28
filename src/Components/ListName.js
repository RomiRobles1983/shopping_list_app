import React, { useState, useEffect } from 'react';
//import "../Style-sheets/ListName.css";

const ListName = ({ listName, onListNameChange, isListOpen }) => {
  const [localListName, setLocalListName] = useState(listName);

  useEffect(() => {
    setLocalListName(listName);
  }, [listName]);

  const handleInputChange = (e) => {
    // Permite cambiar el nombre solo si la lista no está abierta
    if (!isListOpen) {
      const newName = e.target.value;
      setLocalListName(newName);
      onListNameChange(newName);
    }
  };

  return (
    <div className='list-name-container'> 
      <input
        className='list-name'
        type="text"
        placeholder="Name of your list"
        value={localListName}
        onChange={handleInputChange}
        disabled={isListOpen} // Desactiva el campo si la lista está abierta
      />
    </div>
  );
};

export default ListName;