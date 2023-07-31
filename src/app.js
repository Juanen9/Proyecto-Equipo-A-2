const express = require("express");
const morgan = require("morgan");

const userRouter = require("../src/router/userRouter");

//Creamos instancia del servidor.
const server = express();

//server.use(express.urlencoded({extended: false}));
server.use(express.json());
server.use(morgan("dev"));

//Página inicial de la API.
server.get("/", (req, res) => {
  res.status(200).send(`<h1>Página Principal</h1>`);
});

server.use(userRouter);

//Gestionamos los errores del servidor.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.log(err);
  res.status(status).send(message);
});

module.exports = server;
