const mongoose = require("mongoose");
const Lists = require ("../dbLists");
const dbList = require("../dbLists");
const { v4: uuidv4 } = require('uuid');

// Open list

const getLists = async (req, res) => {
  try {
    const allLists = await Lists.find();
    res.status(200).send(allLists);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Save list 

const createOrUpdateList = async (req, res) => {
  const { name, items } = req.body;

  try {
    // Buscar si la lista ya existe
    const existingList = await Lists.findOne({ name });

    if (existingList) {
      // Si la lista existe, actualiza los elementos
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
      // Si la lista no existe, créala
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



        // Agregar un nuevo endpoint para abrir una lista por nombre
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
      
  
  // Agregar un nuevo endpoint para eliminar una lista por nombre o por ID
  const deleteListByName = async (req, res) => {
    const { name } = req.body; // Obtén el nombre desde el cuerpo de la solicitud
    
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
