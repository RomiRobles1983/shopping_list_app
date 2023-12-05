//Define a data model for the shopping list

const mongoose = require("mongoose");
const { Schema } = mongoose;


const listSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // To handle Updates of the lists.
    },
    items: [
      {
        text: {
          type: String,
          required: true,
        },
        purchased: {
          type: Boolean,
          default: false,
        },
        _id: {
          type: String,
          default: mongoose.Types.ObjectId,// To handle remove items & and set as purchased functions.
        },
      },
    ],
  },
  { timestamps: true }
);
  


const shoppingList = mongoose.model("shoppingLists", listSchema);

module.exports = shoppingList;