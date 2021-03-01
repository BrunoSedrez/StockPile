const express = require('express');
const app = express();
const db = require('./Db');
const update = require('./cadastro/cadatrarProd');
var produtos = require('./schema/Produtos');
const Vendas = require('./schema/Vendas');
var nodemailer = require('nodemailer');
const bodyParser = require('body-parser');//Body Parser 
const Pedidos = require('./schema/Pedido');
//const { response } = require('express');
app.use(bodyParser.urlencoded({ extended: false }));// Configurando o body-parser
app.use(bodyParser.json());

const path = require('path');
const { response } = require('express');
const { updateOne } = require('./schema/Csv');
const { log } = require('console');
const { parse } = require('path');
app.use(express.static(path.join(__dirname, 'public'))); //adicionar pág. estáticas, como css, imagens, etc...

var consuAnterior = 0;
var vendaAnterior = 0;
var codProdAnterior = 0;
var consumido = 0;
var dia = 0;
var quantidadeTotal = 0;
var porcentagem = 0;
var calculoPorcentagem = 0;

function formula(csvs, quantConsumida, codProdVenda, data_Venda) {

    console.log("================Entrou no PedidoAut================");
    var csv = csvs;
    console.log(csv)
    var csvFornecedor = ''
    var csvLeadTime = ''

    if (csv[0].CodProd == codProdVenda && csv[0].LeadTime < csv[1].LeadTime && csv[0].LeadTime < csv[2].LeadTime) {
        csvLeadTime = csv[0].LeadTime;
        csvFornecedor = csv[0].Nome;
    } else if (csv[1].CodProd == codProdVenda && csv[1].LeadTime < csv[0].LeadTime && csv[1].LeadTime < csv[2].LeadTime) {
        csvLeadTime = csv[1].LeadTime;
        csvFornecedor = csv[1].Nome;
    } else {
        csvLeadTime = csv[2].LeadTime;
        csvFornecedor = csv[2].Nome;
    }
    /* console.log(csv); */
    console.log(csvLeadTime);
    console.log(csvFornecedor);

    db.buscarProdutosPCod(codProdVenda)

        .then(docs => {

            var cod_Prod = parseFloat(docs[0].cod_prod);
            var nome_Prod = docs[0].nome_Prod;
            var qtd_Estoque = parseFloat(docs[0].qtd_Estoque);
            var data = parseFloat(docs[0].data);
            consumido = parseFloat(docs[0].consumido); // consumo desde o último abastecimento
            dia = parseFloat(docs[0].diasAb) // dias desde o último abastecimento
            quantidadeTotal = parseFloat(docs[0].qtd_Total);
            porcentagem = parseFloat(docs[0].porcentagem);
            var quantTotal = parseFloat(docs[0].qtd_Total); //var do banco

            console.log(docs);

            //---------Formulário aqui----------
            //var quantTotal = parseFloat(docs[0].qtd_Estoque); //var do banco
            var quantAtual = parseFloat(docs[0].qtd_Estoque); //alterar no banco
            console.log("Quant atual vindo do banco " + quantAtual)
            var consumidoDia = parseFloat(quantConsumida); //O que quer vender 
            // consuAnterior += consumido;
            // var dias = 0; //conta quando acontece a venda
            var leadTime = csvLeadTime; //csv
            console.log(leadTime)
            // var consuVendas = 0; //REVER COM ITALO
            var status = "normal"; //status altera dependendo do quantAtual
            var novoPedido = 0; //altera o valor quando o status for critico
            contar(quantConsumida, cod_Prod, data_Venda)


            function calculo() {
                console.log("===========FUNCTION CALCULO===========");
                //porcentagem = 10; // Valor será gerado pelo grafico ABC, sendo que no início todos os produtos terão 15%


                //Formula para calcular o produto
                console.log("Consumido dentro de calculo é " + consumido)
                console.log("quantidade total" + quantidadeTotal)

                calculoPorcentagem = quantidadeTotal * (porcentagem / 100);

                console.log("calculo feito " + calculoPorcentagem);
                var num = (quantAtual - calculoPorcentagem) - (consumido / dia) * leadTime;
                console.log("Formula = " + num.toFixed());

                // quantAtual = quantTotal - (consumido

                if (num <= 0) { //verifica se a quantidade atual do estoque + a porcentagem de segurança dividido pelos vendas do lead time ainda serão sufuciente

                    novoPedido++;
                    status = "critico";
                    email(csvFornecedor, nome_Prod, cod_Prod, quantTotal, quantAtual, data_Venda); // disparar o e-mail quando o status for critico



                    if (novoPedido == 2) {
                        console.log("processando");
                        novoPedido = 0;
                    }
                }
                console.log("dias =" + dia);
                console.log("QuantidadeAtual =" + quantAtual);
                console.log("Status =" + status);
                console.log("NovoPedido =" + novoPedido);
            }
            //função para contar os vendas
            function contar(quantConsumida, cod_Prod, data_Venda) {
                //Dar update na quantConsumida


                //vendaAnterior += dias;
                // consuVendas = + parseFloat(quantConsumida);
                console.log("consumidoDia/////!!!" + consumidoDia);
                quantAtual = quantAtual - consumidoDia;
                console.log(cod_Prod)
                if (cod_Prod != codProdAnterior && codProdAnterior != 0) {
                    console.log("Zerou")
                    // consuVendas = 0;
                    consumido = parseFloat(docs[0].consumido); // consumo desde o último abastecimento
                    consumido += consumidoDia
                    dia = parseFloat(docs[0].diasAb) // dias desde o último abastecimento
                    dia++;
                    //vendaAnterior = 0;
                    //consuAnterior = 0;
                    calculo()
                } else {
                    dia++;
                    consumido += consumidoDia
                    // consuAnterior += consuVendas;
                    console.log("Consumo dentro do else é " + consumido)
                    calculo();
                }
                atualizarProd(codProdVenda, quantAtual, consumido, dia); // banco de dados
                salvarVendas(quantConsumida, cod_Prod, data_Venda);
                console.log("codProdAnterior é " + codProdAnterior);
                codProdAnterior = cod_Prod
                console.log("codProdAnterior atualizado é " + codProdAnterior);

            }
            /* var qtdMenos = consumido - qtd_Estoque
           update.updateProd(qtdMenos); */

        }).catch(error => console.log("ERROR produtosPCod" + error))
}


function atualizarProd(codProdVenda, quantAtual, consumido, dia) {// Atualizar o Banco de Dados dos Produtos
    console.log("Consumido no atualizar é " + consumido)
    produtos.updateOne({ cod_prod: codProdVenda }, { $set: { qtd_Estoque: quantAtual, consumido: consumido, diasAb: dia } }, function (err, result) {
        if (err == null) {
            console.log("Funcionou e atualizou o banco com consumido e dia!")
        } else {
            console.log("Erro no update " + err)
        }
    });
}

function salvarVendas(quantConsumida, cod_Prod, data_Venda) {
    var venda = new Vendas()

    venda.cod_prod = cod_Prod;
    venda.quant_Consumida = quantConsumida;
    console.log("DENTRO DE SALVAR VENDAS" + data_Venda);
    venda.data = data_Venda;

    venda.save()
        .then(docs => {
            console.log("Docs salvo!");
        })
        .catch(error => {
            console.log("Erro: " + error);
        });
}

function email(csvFornecedor, nome_Prod, cod_Prod, quantTotal, quantAtual, data_Venda) {
    console.log("Chegou no email");
    var transporte = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'stockpile.entra21@gmail.com',
            pass: 'entra21StockPile'
        }
        , tls: {//Retira a barreira que o antivirus coloca
            rejectUnauthorized: false
        }
    });
    var qtd_Pedido = quantTotal - quantAtual;
    console.log("quantTotal é " + quantTotal)
    console.log("quantAtual é " + quantAtual)
    console.log("qtd pedido é " + qtd_Pedido)
    const testeMail = {
        from: 'stockpile.entra21@gmail.com', // Remetente
        to: 'gui21.borges@gmail.com', // Destino
        subject: 'Pedido StockPile', // Assunto
        html: '<h2>Olá ' + `${csvFornecedor}` + '</h2>' // Corpo do e-mail
            + '<br/>' + 'Por favor, a StockPile cordialmente requere os seguintes: ' + '<br/>' +
            '<b>' + 'Produto:' + '</b>' + ` ${nome_Prod}` + '<br/>' +
            '<b>' + 'Código:' + '</b>' + `${cod_Prod}` + '<br/>' +
            '<b>' + `Quantidade:` + '</b>' + `${qtd_Pedido}` + '<br/>' + '<br/>' +
            'Atenciosamente,' + '<br/>' +
            '<h3>' + 'StockPile' + '</h3>'
    };
    transporte.sendMail(testeMail, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
        module.exports = { status }
    });
    NewPedido(cod_Prod, qtd_Pedido, data_Venda)
}
function NewPedido(cod_Prod, qtd_Pedido, data_Venda) {
    var pedido = new Pedidos()

    var CodPedServer = ''
    var cod1 = Math.floor(Math.random() * 10).toFixed(0)
    var cod2 = Math.floor(Math.random() * 10).toFixed(0)
    var cod3 = Math.floor(Math.random() * 10).toFixed(0)
    CodPedServer += cod1 + cod2 + cod3
    pedido.cod_Ped = CodPedServer;
    pedido.data_Ped = data_Venda;
    pedido.qtd_Total = qtd_Pedido;
    pedido.cod_prod = cod_Prod
    pedido.save()
        .then(docs => {
            console.log("Pedido salvo no DB!");
        })
        .catch(error => {
            console.log("Erro: " + error);
        });
};
module.exports = { formula };