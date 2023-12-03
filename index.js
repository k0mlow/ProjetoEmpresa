const { VERSION } = require('ejs');

const express = require('express');

const res = require('express/lib/response');
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const mongoose = require("mongoose");

require('dotenv/config');

mongoose.connect(process.env.MONGO_URI);

const FuncionarioModel = require("./models/funcionarioModel");
const SetorModel = require("./models/setorModel");
const UsuarioModel = require("./models/usuarioModel");

const session = require("express-session");
app.use(session({
    secret: 'ifpe',
    saveUninitialized: false,
    resave: false
}));



const funcionarioRoutes = require("./routes/FuncionarioRoutes");
const setorRoutes = require("./routes/SetorRoutes");
const usuarioRoutes = require("./routes/UsuarioRoutes");
app.use(funcionarioRoutes);
app.use(setorRoutes);
app.use(usuarioRoutes);

app.get("/", function (req, res) {
    if (req.session.usuario != undefined) {
        res.render("index");
    } else {
        res.redirect("/usuario/login");
    }
});

app.get("/logout", function (req, res) {
    req.session.usuario = null;
    res.redirect("/usuario/login");
});

app.use(function (req, res) {
    res.status(404).render("404");
});

app.get("/logout", function (req, res) {
    req.session.usuario = null;
    res.redirect("/usuarios/login");
});

app.listen(process.env.porta, function () {
    console.log("Rodando");
})



