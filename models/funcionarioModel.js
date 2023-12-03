const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const funcionarioSchema = Schema({
    id: Number,
    nome: String,
    idade: Number,
    setor: String,
});

module.exports = mongoose.model("Funcionario", funcionarioSchema);