const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config(); //Load environment variables from an .env file.

const {
  getLists,
  openListByName,
  createOrUpdateList,
  deleteListByName,
} = require("./controllers/listController"); //Imports controller functions from listController.js

// App config
const app = express();
const port = process.env.PORT || 8000;
const conexionURL = process.env.URI_MONGO;

// Middlewares
// Convert to JSON
app.use(morgan("tiny"));//Records HTTP requests in the console.
app.use(express.json());//Converts the request body into JSON.
app.use(cors()); //Allows requests from other domains.

// DB Configuration: Connects the application to the MongoDB database using the URL
mongoose
  .connect(conexionURL)
  .then(() => {
    app.listen(port, () =>
      console.log(`listen at port ${port}`)
    ); 
  })
  .catch((err) => {
    console.log(err);
  });


// API endpoints
// Open Lists
app.get("/lists", getLists);

// Open Lists by name
app.get("/lists/:name", openListByName);

// Save List (with a name)
app.post("/lists", createOrUpdateList);


// Delete List
app.delete("/lists/:name", deleteListByName);

// Control de Errores Global: Captures and handles global errors. If an error happens, it is logged in the console and an error reply is sent.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});