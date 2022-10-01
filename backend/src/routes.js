const express = require('express');
const routes = express.Router();

const auth = require("./middlewares/authentication");

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");

const UserValidator = require("./validators/UserValidator");
const LinkController = require('./controllers/LinkController');

// Users
//routes.get("/user/:userId", UserValidator.getById, UserController.getById);        // Busca um usuario
//routes.get("/users", UserController.index);                 // Lista todos os usuarios
//routes.post("/user", UserValidator.create, UserController.create);                // Cria um usuario
//routes.put("/user/:userId", UserValidator.update, UserController.update);         // Atualiza um usuario
//routes.delete("/user/:userId", UserValidator.delete, UserController.delete);      // Deleta um usuario
routes.get("/user/:userId", UserController.getById);        // Busca um usuario
routes.get("/users", UserController.index);                 // Lista todos os usuarios
routes.post("/user", UserController.create);                // Cria um usuario
routes.put("/user/:userId", UserController.update);         // Atualiza um usuario
routes.delete("/user/:userId", UserController.delete);      // Deleta um usuario

// Session
routes.post("/login", SessionController.signIn);

// Links
//routes.post("/link", LinkController.create)
routes.get("/link/:linkId", LinkController.getById);        // Busca um usuario
routes.get("/links", LinkController.index);                 // Lista todos os usuarios
routes.post("/link", LinkController.create);                // Cria um usuario
routes.put("/link/:linkId", LinkController.update);         // Atualiza um usuario
routes.delete("/link/:linkId", LinkController.delete);      // Deleta um usuario

module.exports = routes;