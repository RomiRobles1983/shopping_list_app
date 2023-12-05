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

function ItemList({ listName, items, onListNameChange }) {// Component and props are defined
  const [message, setMessage] = useState(null);
  const [itemsState, setItems] = useState(items || []);
  const [localListName, setLocalListName] = useState(listName || '')
  const [isListOpen, setIsListOpen] = useState(false); //useState to define various local states, including message for messages, itemsState for list items,
  const history = useHistory(); //history is used to access React Router's browsing history.


  // OPEN LIST FUNCTION

  const openList = async (listName) => {
    try {
      const loadedList = await openListByName(listName);// Use the function openListByName in ./api/OpenListByNameRequest to open a list by name. 
  
      //// Checks if loaded items have _id, if not, assigns a new one//Prevents errors when the database does not give id to items and they are passed as undefined
      const updatedItems = loadedList.items.map(item => {
        const newItem = {
          ...item,
          _id: item._id || uuidv4().toString()
        };
        console.log('Generated _id:', newItem._id); //Print the Check the generated id (control)
        return newItem;
      });
  
      //Print the all the generated id (control)
      console.log('Generated _ids:', updatedItems.map(item => item._id));
  
      setItems(updatedItems);
      setLocalListName(loadedList.name || '');
    } catch (error) {
      console.error('Error opening the list:', error.message);
    }
  };


//useEffect to load the list name  or renaming the list.
  useEffect(() => {
    if (listName) {
      openList(listName);
    }
  }, [listName]);

//Use useEffect to update the status with the items and the list name when they change.
  useEffect(() => {
    setItems(items || []);
    setLocalListName(listName || '');
  }, [items, listName]);


// ADD ITEM FUNCTION (text-_id)
const addItem = (item) => {
  if (item.text.trim()) {
    item.text = item.text.trim();
    item._id = uuidv4().toString();  // Asign a unique id-
    const currentItems = [item, ...itemsState];
    setItems(currentItems);
  }
};

//REMOVE ITEM FUNCTION (_id)

  const removeItem = (id) => {
    console.log('Removing item with id:', id);
    const currentItems = itemsState.filter((item) => item._id !== id);
    setItems(currentItems);
  };


  //SET AS PURCHASED FUNCTION (_id)// opposes the current state by changing purchased from TRUE to FALSE each time the item's text is clicked (a new array is created)
  const setAsPurchased = (id) => {
    console.log('Setting as purchased item with id:', id);
    const currentItems = itemsState.map((item) =>
      item._id === id ? { ...item, purchased: !item.purchased } : item
    );
    setItems(currentItems);
  };


//SAVE LIST FUNCTION (CREATE OR UPDATE LIST)

const handleSaveList = async () => {
  try {
    if (localListName.trim() === '') {
      throw new Error('Your list has no name');//Check if the list has a name
    }

    const listData = {
      name: localListName,
      items: itemsState.map(item => {
        /* Destruct the component, remove the _id field before sending it (the rest) to the backend. Added because of problems 
        to handle item ids when the list is opened from the database.*/
        const { _id, ...rest } = item;
        return rest;
      }),
    };

    const savedList = await saveList(listData);
    console.log('Saved LIST:', savedList);

    setMessage(`Your list " ${localListName}" has been saved.`);

    //// Wait 3 seconds before redirecting to the home page.
    setTimeout(() => {
      setMessage(null);
      history.push('/');
    }, 3000);
  } catch (error) {
    console.error('Error saving the list:', error.message);
    setMessage(`Your list "${localListName}" could not be saved: ${error.message}`);
  }
};


//REMOVE LIST FUNCTION

  //This part is used to clear the list items and name, also when the list is not saved in the data base 
const clearListInfo = () => {
  console.log('handleRemoveList function called');
  setItems([]);
  setLocalListName('');
};


//REMOVE THE LIST FROM THE DATA BASE

const handleRemoveList = async () => {
  clearListInfo ()

  try {
    console.log('Removing list with name:', localListName);
    const removedList = await removeList(localListName);
    console.log('Value returned by removeList:', removedList);

    setMessage(`The list has been removed.`);

    setTimeout(() => {
      console.log('removed list:', removedList);
    }, 100);
  } catch (error) {
    console.error('Error during removeList:', error);
  }
};



  return (
    // RENDER THE COMPONENTS ListName/ItemForm/Item passing the corresponding props
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
{/* RENDER THE COMPONENT BotomButton 2 times the corresponding props for SAVE LIST and REMOVE LIST */}
        <div className="buttom-buttons-container">
          <BottomButton isSaveListButton={true} onClick={handleSaveList} />
          <BottomButton isSaveListButton={false} onClick={() => { console.log('Button clicked'); handleRemoveList(); }} />

        </div>
      </div>
    
{/* define the messages that will confirm that the list was or was not SAVED/REMOVED. */}
      {message && (
        <div className="message-container">
          <p>{message}</p>
        </div>
      )}
    </>
  );
}

export default ItemList;
