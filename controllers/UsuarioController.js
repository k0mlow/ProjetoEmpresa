const usuarioModel = require("../models/usuarioModel");
const UsuarioModel = require("../models/usuarioModel");
const bcryptjs = require("bcryptjs");

class UsuarioController{
    static async cadastrar(req, res){
        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(req.body.senha, salt);
        const usuario = await usuarioModel.findOne({email: req.body.email});
        if (usuario == null){
        const novoUsuario = new UsuarioModel({
            nome:req.body.nome,
            email:req.body.email,
            senha: hash,
        });
        await novoUsuario.save()
        res.redirect("/usuario?s=1");
    }else{
        res.redirect(`usuario/cadastrar?s=1&nome=${req.body.nome}&email=${req.body.email}`);
    }
    }

    static cadastrarRoute(req, res){
        const status = req.query.s;
        let usuario = {
            email: req.query.email,
            nome: req.query.nome
        };
        if(req.session.usuario == null){
            res.render("usuario/cadastrar", {usuario, status});
        }else{
            res.redirect("/");
        }
        
    }

    static async listar(req, res){
        const status = req.query.s;
        const vetorUsuario = await UsuarioModel.find();
        res.render("usuario/relatorio", {vetorUsuario, status});
    }

    static async detalhar(req, res){
        const usuario = await UsuarioModel.findOne({_id: req.params.id});
        res.render("usuario/detalhar", {usuario});
}
     static async remover(req, res){
        const usuario = await UsuarioModel.findOneAndDelete({_id: req.params.id});
        res.redirect("/usuario?s=2");
}

    static async editar(req, res){      
    const status = req.query.s;
    const usuario = await UsuarioModel.findOne({_id: req.params.id});
    res.render("usuario/editar", {usuario, status});
}

    static async atualizar(req, res){
        const usuarioAtual = await UsuarioModel.findOne({_id: req.body._id});
        const email = await UsuarioModel.findOne({email: req.body.email});
        console.log(usuarioAtual);
        if(usuarioAtual.email == req.body.email || email == null){
            await UsuarioModel.findOneAndUpdate({_id: req.body._id}, 
                {
                    nome: req.body.nome,
                    email: req.body.email
                });
                res.redirect("/usuario?s=3");
        } else{
            res.redirect(`/usuario/editar/${req.body._id}?s=1`);
        }
    }

    static loginGet(req, res){
        const status = req.query.s;
        res.render("usuario/login", {status});
    }

    static async loginPost(req, res){
        const usuario = await usuarioModel.findOne({email: req.body.email});
        console.log(usuario);
        if (usuario != undefined){
            if(bcryptjs.compareSync(req.body.senha, usuario.senha)){
                req.session.usuario = usuario.email;
                res.redirect("/")
            } else {
                res.redirect(`/usuario/login?s=4&email=${req.body.email}`);
            }
        }  
    }

}
module.exports = UsuarioController;