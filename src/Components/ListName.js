import React, { useState, useEffect } from 'react';

const ListName = ({ listName, onListNameChange, isListOpen }) => {//The necessary props are defined to handle the list name in the ItemList component.
  const [localListName, setLocalListName] = useState(listName);

  useEffect(() => {
    setLocalListName(listName);
  }, [listName]);

  const handleInputChange = (e) => {
    //  allows to change de name if it is a new list.
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
        disabled={isListOpen} //  Disables the possibility to change the name if it is a list that was opened from the database.
      />
    </div>
  );
};

export default ListName;