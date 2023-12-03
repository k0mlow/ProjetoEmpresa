const FuncionarioModel = require("../models/funcionarioModel");

class FuncionarioController{
    static async cadastrar(req, res){
        const novoFuncionario = new FuncionarioModel({
            id:req.body.id,
            nome:req.body.nome,
            idade:req.body.idade,
            setor:req.body.setor,
            
        });
        await novoFuncionario.save()
        res.redirect("/funcionario?s=1");
    }

    static cadastrarGet(req, res){
        res.render("funcionario/cadastrar");
    }

    static async listar(req, res){
        const status = req.query.s;
        const vetorFuncionario = await FuncionarioModel.find();
        res.render("funcionario/relatorio", {vetorFuncionario, status });
    }

    static async detalhar(req, res){
        const funcionario = await FuncionarioModel.findOne({id: req.params.id});
        res.render("funcionario/detalhar", {funcionario});
}

    static async remover(req, res){
    const funcionario = await FuncionarioModel.findOneAndDelete({id: req.params.id});
    res.redirect("/funcionario?s=2");
}

    static async editar(req, res){
    const funcionario = await FuncionarioModel.findOne({id: req.params.id});
    res.render("funcionario/editar", {funcionario});
}
    static async atualizar(req, res){
    const func = req.body;
    await FuncionarioModel.findOneAndUpdate({_id: req.body._id}, 
        {

            nome: req.body.nome,
            idade: req.body.idade,
            setor: req.body.setor,
        }
        
        );
    res.redirect("/funcionario?s=3");
}


}
module.exports = FuncionarioController;