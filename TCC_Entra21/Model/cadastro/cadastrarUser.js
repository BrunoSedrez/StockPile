const express = require('express');
const app = express();
var Usuario = require('../schema/Usuario');
const path = require('path');
const bodyParser = require('body-parser');//Body Parser 
const { response } = require('express');
app.use(bodyParser.urlencoded({ extended: false }));// Configurando o body-parser
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'html')));

function insertUser(req) {
    console.log("Chegou no InsertUser");
    var usuario = new Usuario(); //collection usuarios

    usuario.cep_user = req.body.InCEP;//Código do Produto
    usuario.nome_user = req.body.InNmUsuario;
    usuario.CPF_user = req.body.InCPF;
    usuario.email_user = req.body.InEmail;
    usuario.CNPJ_user = req.body.InCNPJ;
    usuario.senha_user = req.body.idInputSenha;
    usuario.endereco_user = req.body.InEndereco;
    usuario.complemento_user = req.body.InComplemento;
    usuario.nomeEmpresa_user = req.body.InNmEmpresa;
    usuario.save() //Salvar no db
    console.log(usuario);
    return usuario;
}
module.exports = { insertUser };