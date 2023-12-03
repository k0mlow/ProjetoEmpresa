const express = require("express");
const routes = express.Router();
const auth = require("../middlewares/usuarioAuth");
const usuarioController = require("../controllers/UsuarioController");

routes.get("/usuario/", auth, usuarioController.listar);
routes.get("/usuario/cadastrar", usuarioController.cadastrarRoute);
routes.post("/usuario/cadastrar", usuarioController.cadastrar);
routes.get("/usuario/remover/:id", usuarioController.remover);
routes.get("/usuario/editar/:id", auth, usuarioController.editar);
routes.post("/usuario/atualizar/", usuarioController.atualizar);
routes.post("/usuario/login", usuarioController.loginPost);
routes.get("/usuario/login", usuarioController.loginGet);
routes.get("/usuario/:id", auth, usuarioController.detalhar);

module.exports = routes;