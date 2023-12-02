const mongoose = require("mongoose");
const { Schema } = mongoose;


const listSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
          default: mongoose.Types.ObjectId,
        },
      },
    ],
  },
  { timestamps: true }
);
  


const shoppingList = mongoose.model("shoppingLists", listSchema);

module.exports = shoppingList;