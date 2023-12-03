const express = require("express");
const routes = express.Router();
const auth = require("../middlewares/usuarioAuth");
const setorController = require("../controllers/SetorController");

routes.post("/setor", setorController.cadastrar);
routes.get("/setor/cadastrar", auth, setorController.cadastrarGet);
routes.get("/setor/", auth, setorController.listar);
routes.get("/setor/:id", setorController.detalhar);
routes.get("/setor/remover/:id", setorController.remover);
routes.get("/setor/editar/:id", setorController.editar);
routes.post("/setor/atualizar/", setorController.atualizar);

module.exports = routes;