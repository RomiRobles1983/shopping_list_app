// OpenList.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Agrega esta línea
import ItemList from '../Components/ItemList';  // Ajusta la ruta según tu estructura
import openListByName from "./api/OpenListByNameRequest";

function OpenList() {
  const { listName } = useParams();
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const fetchListData = async () => {
      try {
        const listData = await openListByName(listName);
        console.log('List Data received in OpenList.js:', listData);
        setItems(listData.items);
      } catch (error) {
        console.error('Error fetching items for the selected list:', error);
      }
    };
  
    fetchListData();
  }, [listName]);

  // Llama a tu función con el nombre de la lista si es necesario
  const onListNameChange = (newName) => {
    console.log('New List Name in OpenList:', newName);
    // Llama a tu función aquí con newName
  };

  return (
    <div className="OpenList">
      <div className="complete-list-container">
        {/* Renderiza tu componente ItemList con los datos obtenidos */}
        <ItemList listName={listName} items={items} onListNameChange={onListNameChange} />
      </div>
    </div>
  );
}

export default OpenList;
