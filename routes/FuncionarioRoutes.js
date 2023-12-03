const express = require("express");
const routes = express.Router();
const auth = require("../middlewares/usuarioAuth");
const funcionarioController = require("../controllers/FuncionarioController");

routes.post("/funcionario", funcionarioController.cadastrar);
routes.get("/funcionario/cadastrar", auth, funcionarioController.cadastrarGet);
routes.get("/funcionario/", auth, funcionarioController.listar);
routes.get("/funcionario/:id", funcionarioController.detalhar);
routes.get("/funcionario/remover/:id", funcionarioController.remover);
routes.get("/funcionario/editar/:id", funcionarioController.editar);
routes.post("/funcionario/atualizar/", funcionarioController.atualizar);

module.exports = routes;