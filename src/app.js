const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const createStaticDir = require("../src/service/createStaticDir");
const path = require("path");
const cors = require('cors');

const userRouter = require("../src/router/userRouter");
const exercisesRouter = require("../src/router/exercisesRouter");

//Creamos instancia del servidor.
const server = express();
server.use(cors());

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(morgan("dev"));
server.use(fileUpload());

//Ruta completa al directorio uploads, donde subiremos los archivos estáticos.
const staticDir = path.join(__dirname, "uploads");

//Creamos un middleware para trabajar con archivos estáticos.
server.use(express.static(staticDir));

//Creamos el directorio uploads y sus subdirectorios.
createStaticDir(staticDir);

//Página inicial de la API.
server.get("/", (req, res) => {
  res.status(200).send(`<h1>Página Principal</h1>`);
});

server.use(userRouter);
server.use(exercisesRouter);

//Gestionamos los errores del servidor.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.log(err);
  res.status(status).send(message);
});

module.exports = server;
