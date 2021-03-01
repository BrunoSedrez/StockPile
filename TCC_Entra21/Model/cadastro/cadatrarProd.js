const express = require('express');
const app = express();
var produtos = require('../schema/Produtos');
const path = require('path');

const bodyParser = require('body-parser');//Body Parser 
const { response } = require('express');
app.use(bodyParser.urlencoded({ extended: false }));// Configurando o body-parser
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'html')));


function cadastrarProd(req, resp) {
    var produto = new produtos(); //collection produtos

    // valores do formulário
    produto.cod_prod = req.body.nmCodProd;//Código do Produto
    produto.nome_Prod = req.body.nmDescrProd;//descrição do Produto
    produto.qtd_Estoque = req.body.nmQtd;//Quantidade do Produto
    produto.data = req.body.nmData;
    produto.consumido = 0;
    produto.diasAb = 0;
    produto.qtd_Total = req.body.nmQtd;//Quantidade Máxima do Estoque
    console.log(typeof ("CADastrarProd typeOf: " + produto.porcentagemSeg));
    produto.porcentagem = Number(req.body.nmPorcentagem);//Porentagem de Segurança
    console.log(typeof ("CADastrarProd typeOf2: " + produto.porcentagemSeg));

    return produto.save() //Salvar no db
}
module.exports = { cadastrarProd };