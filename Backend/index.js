const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const {
  getLists,
  openListByName,
  createOrUpdateList,
  deleteListByName,
} = require("./controllers/listController");

// App config
const app = express();

const port = process.env.PORT || 8000;

const conexionURL = process.env.URI_MONGO;

// Middlewares
// Convert to JSON
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors()); // Cambiado a 'cors' en minúsculas

// DB Configuration
mongoose
  .connect(conexionURL)
  .then(() => {
    app.listen(port, () =>
      console.log(`Escuchando el puerto ${port}`)
    ); // Cambiado a 'port' en lugar de 'process.env.PORT'
  })
  .catch((err) => {
    console.log(err);
  });

// API endpoints
// Open Lists
app.get("/lists", getLists);

// Open Lists by name
app.get("/lists/:name", openListByName);

// Save List (poniéndole un nombre)
app.post("/lists", createOrUpdateList);


// Delete List
app.delete("/lists/:name", deleteListByName);

// Control de Errores Global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});