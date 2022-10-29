const express = require('express');
const routes = express.Router();

const auth = require("./middlewares/authentication");

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");

const UserValidator = require("./validators/UserValidator");
const LinkController = require('./controllers/LinkController');

// Users
routes.get("/user/:userId", UserController.getById);        // Busca um usuario
routes.get("/users", UserController.index);                 // Lista todos os usuarios
routes.post("/user", UserController.create);                // Cria um usuario
routes.put("/user/:userId", UserController.update);         // Atualiza um usuario
routes.delete("/user/:userId", UserController.delete);      // Deleta um usuario

// Session
routes.post("/login", SessionController.signIn);

// Links
routes.get("/link/:linkId", LinkController.getById);        // Busca um link
routes.get("/linkUser/:userId", LinkController.getByUserId);// link pelo user ID
routes.get("/links", LinkController.index);                 // Lista todos os link
routes.post("/link", LinkController.create);                // Cria um link
routes.put("/link/:linkId", LinkController.update);         // Atualiza um link
routes.delete("/link/:linkId", LinkController.delete);      // Deleta um link

module.exports = routes;