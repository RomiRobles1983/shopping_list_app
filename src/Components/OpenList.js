// OpenList.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Agrega esta línea
import ItemList from '../Components/ItemList';  // Ajusta la ruta según tu estructura
import openListByName from "./api/OpenListByNameRequest";

// OPEN LIST FUNCTION

function OpenList() {
  const { listName } = useParams(); // Gets the URL parameter using useParams of React Router
  const [items, setItems] = useState([]);// Defines a state for storing the list elements
  
  useEffect(() => {// // Use useEffect to make an API call when loading the component or when changing listName
    const fetchListData = async () => {
      try {
        const listData = await openListByName(listName);// // Call API function to get list data by name
        console.log('List Data received in OpenList.js:', listData);
        setItems(listData.items);// Update status with list items  
      } catch (error) {
        console.error('Error fetching items for the selected list:', error);
      }
    };
  
    fetchListData();
  }, [listName]);

  const onListNameChange = (newName) => {
    console.log('New List Name in OpenList:', newName);
  
  };

  return (
    <div className="OpenList">
      <div className="complete-list-container">
        {/* Render ItemList component with the obtained data */}
        <ItemList listName={listName} items={items} onListNameChange={onListNameChange} />
      </div>
    </div>
  );
}

export default OpenList;
