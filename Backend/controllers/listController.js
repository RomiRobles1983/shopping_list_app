//The functions that handle CRUD operations are defined.

const mongoose = require("mongoose");
const Lists = require ("../dbLists");
const dbList = require("../dbLists");
const { v4: uuidv4 } = require('uuid');//To give unique ids to items 

//1- Open list (Find all lists stored in the database.)

const getLists = async (req, res) => {
  try {
    const allLists = await Lists.find();
    res.status(200).send(allLists);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//2-Create or Update the List. Depending on whether the list name is already in the database, it will create a list, or update an existing one. 

const createOrUpdateList = async (req, res) => {
  const { name, items } = req.body;

  try {
  
    const existingList = await Lists.findOne({ name }); // Search if the name already exists

    if (existingList) {
     // If the list exists, update the items
      existingList.items = items.map(item => {
        const newItem = {
          ...item,
          _id: item._id || uuidv4().toString(),
        };
        console.log('Generated _id for item:', newItem._id);
        return newItem;
      });
      const updatedList = await existingList.save();
      res.status(200).json(updatedList);
    } else {
      // If the list does not exist, it is created.
      const newList = new Lists({
        name,
        items: items.map(item => {
          const newItem = {
            ...item,
            _id: uuidv4().toString(),
          };
          console.log('Generated _id for item:', newItem._id);
          return newItem;
        }),
      });

      const savedList = await newList.save();
      res.status(201).json(savedList);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3- Open list by name (Uses the list "name" in the request parameters to search the database for the list. Responds with the list if found,)
      const openListByName = async (req, res) => {
      const { name } = req.params;
      console.log('Attempting to open list with name:', name);
        try {
        const list = await Lists.findOne({ name });
            if (!list) {
              console.log('List not found');
              return res.status(404).json({ message: 'Lista no encontrada' });
            }
            console.log('List found:', list);
            res.status(200).json(list);
        } catch (error) {
            console.error('Error opening list by name:', error.message);
            res.status(500).json({ message: error.message });
          }
        };
      
  
  // 4- Detele List by name (Gets the name of the list from the request body. Use findOneAndDelete to find and delete the list by name.)
  const deleteListByName = async (req, res) => {
    const { name } = req.body; 
    
    try {
        const deletedList = await Lists.findOneAndDelete({ name });
    
        if (!deletedList) {
            return res.status(404).json({ message: "Lista no encontrada" });
        }
    
        res.status(200).json(deletedList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports ={
    getLists,
    createOrUpdateList,
    openListByName,
    deleteListByName,
  };
