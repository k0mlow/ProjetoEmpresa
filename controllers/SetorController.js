const SetorModel = require("../models/setorModel");

class SetorController{
    static async cadastrar(req, res){
        const novoSetor = new SetorModel({
            id:req.body.id,
            nome:req.body.nome,
            funcionarios:req.body.funcionarios,
        });
        await novoSetor.save()
        res.redirect("/setor?s=1");
    }

    static cadastrarGet(req, res){
        res.render("setor/cadastrar");
    }

    static async listar(req, res){
        const status = req.query.s;
        const vetorSetor = await SetorModel.find();
        res.render("setor/relatorio", {vetorSetor, status});
    }

    static async detalhar(req, res){
        const setor = await SetorModel.findOne({id: req.params.id});
        res.render("setor/detalhar", {setor});
}
     static async remover(req, res){
        const setor = await SetorModel.findOneAndDelete({id: req.params.id});
        res.redirect("/setor?s=2");
}

    static async editar(req, res){
    const setor = await SetorModel.findOne({id: req.params.id});
    res.render("setor/editar", {setor});
}
    static async atualizar(req, res){
    const func = req.body;
    await SetorModel.findOneAndUpdate({_id: req.body._id}, 
        {
            nome: req.body.nome,
            funcionarios: req.body.funcionarios,           
        }
        
        );
    res.redirect("/setor?s=3");
}
}
module.exports = SetorController;