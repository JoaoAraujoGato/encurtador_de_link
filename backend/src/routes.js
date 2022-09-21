const express = require('express');
const routes = express.Router();

const auth = require("./middlewares/authentication");

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");

const UserValidator = require("./validators/UserValidator");

// Users
routes.get("/user/:userId", UserValidator.getById, UserController.getById);        // Busca um usuario
routes.get("/users", UserController.index);                 // Lista todos os usuarios
routes.post("/user", UserValidator.create, UserController.create);                // Cria um usuario
routes.put("/user/:userId", UserValidator.update, UserController.update);         // Atualiza um usuario
routes.delete("/user/:userId", UserValidator.delete, UserController.delete);      // Deleta um usuario

// Session
routes.post("/login", SessionController.signIn);

module.exports = routes;