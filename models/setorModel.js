const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const setorSchema = Schema({
    id: Number,
    nome: String,
    funcionarios: Number,
});

module.exports = mongoose.model("Setor", setorSchema);