import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm.js";
import "../Style-sheets/ItemList.css";
import Item from "./Item";
import ListName from "./ListName";
import BottomButton from "./BottomButton";
import saveList from "./api/SaveListsRequest.js";
import removeList from "./api/RemoveListRequest.js";
import { v4 as uuidv4 } from 'uuid';
import openListByName from "./api/OpenListByNameRequest.js";
import { useHistory } from 'react-router-dom'

function ItemList({ listName, items, onListNameChange }) {
  const [message, setMessage] = useState(null);
  const [itemsState, setItems] = useState(items || []);
  const [localListName, setLocalListName] = useState(listName || '')
  const [isListOpen, setIsListOpen] = useState(false);
  const history = useHistory();

  const openList = async (listName) => {
    try {
      const loadedList = await openListByName(listName);
      
      // Verifica si los elementos cargados tienen _id, si no, asigna uno nuevo
      const updatedItems = loadedList.items.map(item => ({
        ...item,
        _id: item._id || uuidv4().toString()
      }));
  
      setItems(updatedItems);
      setLocalListName(loadedList.name || '');
      setIsListOpen(true);
    } catch (error) {
      console.error('Error opening the list:', error.message);
    }
  };

  useEffect(() => {
    if (listName) {
      openList(listName);
    }
  }, [listName]);

  useEffect(() => {
    setItems(items || []);
    setLocalListName(listName || '');
  }, [items, listName]);

const addItem = (item) => {
  if (item.text.trim()) {
    item.text = item.text.trim();
    item._id = uuidv4().toString();  // Asigna un nuevo _id
    const currentItems = [item, ...itemsState];
    setItems(currentItems);
  }
};

  const removeItem = (id) => {
    console.log('Removing item with id:', id);
    const currentItems = itemsState.filter((item) => item._id !== id);
    setItems(currentItems);
  };

  const setAsPurchased = (id) => {
    console.log('Setting as purchased item with id:', id);
    const currentItems = itemsState.map((item) =>
      item._id === id ? { ...item, purchased: !item.purchased } : item
    );
    setItems(currentItems);
  };

const handleSaveList = async () => {
  try {
    if (localListName.trim() === '') {
      throw new Error('Your list has no name');
    }

    const listData = {
      name: localListName,
      items: itemsState.map(item => {
        // Elimina el campo _id antes de enviarlo al backend
        const { _id, ...rest } = item;
        return rest;
      }),
    };

    const savedList = await saveList(listData);
    console.log('Lista guardada:', savedList);

    setMessage(`Your list " ${localListName}" has been saved.`);

    // Espera 3 segundos antes de redirigir a la página de inicio
    setTimeout(() => {
      setMessage(null);
      history.push('/');
    }, 3000);
  } catch (error) {
    console.error('Error al guardar la lista:', error.message);
    setMessage(`Your list "${localListName}" could not be saved: ${error.message}`);
  }
};
  
const clearListInfo = () => {
  console.log('handleRemoveList function called');
  setItems([]);
  setLocalListName('');
};

const handleRemoveList = async () => {
  clearListInfo ()

  try {
    console.log('Removing list with name:', localListName);
    const removedList = await removeList(localListName);
    console.log('Value returned by removeList:', removedList);

    setMessage(`The list has been removed.`);

    // Añade un pequeño retraso antes de imprimir el mensaje
    setTimeout(() => {
      console.log('Lista eliminada:', removedList);
    }, 100);
  } catch (error) {
    console.error('Error during removeList:', error);
  }
};




  return (
    <>
      <div className="items-list-container">
        <ListName
          listName={localListName}
          onListNameChange={(newName) => {
            setLocalListName(newName);
            onListNameChange(newName);
          }}
          isListOpen={isListOpen}
        />
        <ItemForm onSubmit={addItem} />

        {itemsState.map((item) => (
  <Item
    key={item._id}
    id={item._id}
    text={item.text}
    purchased={item.purchased}
    removeItem={() => removeItem(item._id)}
    setAsPurchased={() => setAsPurchased(item._id)}
  />
))}
        <div className="buttom-buttons-container">
          <BottomButton isSaveListButton={true} onClick={handleSaveList} />
          <BottomButton isSaveListButton={false} onClick={() => { console.log('Button clicked'); handleRemoveList(); }} />

        </div>
      </div>

      {message && (
        <div className="message-container">
          <p>{message}</p>
        </div>
      )}
    </>
  );
}

export default ItemList;
