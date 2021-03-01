const express = require('express');
const app = express();
const db = require("./Model/Db");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');//Body Parser
const path = require('path');
const csv = require('./Model/schema/Csv');
const produtos = require('./Model/schema/Produtos');
const pedidoAut = require('./Model/PedidoAut');
//const cadastro = require('./Model/cadastro/cadatrarProd');
const cadastroProd = require('./Model/schema/Produtos')
const Pedido = require('./Model/schema/Pedido');
const PedidosArq = require('./Model/schema/PedidosArq');
//const cadastroUser = require('./Model/cadastro/cadastrarUser');
const usuarios = require('./Model/schema/Usuario');
const Vendas = require('./Model/schema/Vendas');
//var fs = require('fs');// File System
//var csvParse = require('csv-parser');// CSV parse
app.use(bodyParser.urlencoded({ extended: false }));// Configurando o body-parser
app.use(bodyParser.json());

var mongoose = require("mongoose"); // carregar o modulo mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/projetoFinal", { useMongoClient: true })
    .then(function () {
        console.log("MongoDB Conectado...");
    })
    .catch(function (err) {
        console.log("Erro na conexão " + err);
    });
app.use(express.static(path.join(__dirname, 'public'))); //adicionar pág. estáticas, como css, imagens, etc...
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
/* 
app.get('/', function (req, resp) {
    resp.sendFile(__dirname + '/login.html');
}); */
app.post('/cadastroValida/:produto', function (req, resp) {//Importar Produto
    var cod = req.params.produto;

    db.buscarProdutosPCod(cod)// Consultar o Produto no Estoque
        .then(prodPorCod => {
            //console.log(prodPorCod);
            resp.json(prodPorCod);
        }).catch(error => {
            console.log('Erro do DB...: ' + error);
        })
});

app.post('/cadastroImport', function (req, resp) {
    var produto = new cadastroProd(); //collection produtos
    console.log("REQ>BODY>PORCENTAGEM: " + req.body.nmPorcentagem);
    console.log(typeof (req.body.nmPorcentagem));
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

    return produto.save()
        .then(function (result) {
            console.log(result + ": result, Produto Input Cadastrado com sucesso!");
            resp.json(result)
        }).catch(function (err) {
            console.log("Erro no DB " + err)
        });//Salvar no db
});
app.post('/alterarProd', function (req, resp) {
    var codProd = req.body.nmCodProd;
    var descrProd = req.body.nmDescrProd;
    var qtd = req.body.nmQtd;
    var data = req.body.nmData;
    produtos.updateOne({ cod_prod: codProd }, { $set: { nome_Prod: descrProd, qtd_Estoque: qtd, data: data } }, function (err, result) {
        if (err == null) {
            resp.send(result)
        } else {
            console.log("Erro no update " + err)
        }
    });
});
app.post('/buscaProdutos', function (req, resp) {
    produtos.find()
        .then(function (produtos) {
            console.log(produtos + "Busca Produtos!");
            resp.json(produtos);
        }).catch(function (err) {
            console.log("Erro no DBProd " + err)
        });
})
app.post('/exclusao', function (req, resp) {  //Excluir Produto
    var cod = req.body.nmExcluir;//cod exclusao
    db.buscarProdutosPCod(cod) // Consultar o estoque
        .then(function (docs) {
            console.log(docs);
            produtos.deleteOne()
                .then(function (result) {
                    console.log("Produto" + result[0] + "deletado");
                }).catch(function (err) {
                    console.log("Erro na exclusão" + err);
                });
        }).catch(function (err) {
            console.log("Erro no DB " + err);
        });
});
app.post('/pedidosAut', function (req, resp) {
    var quantConsumida = req.body.nmQtdVendido; //Quantidade Consumida
    var codProdVenda = req.body.nmCodProd;
    var data_Venda = req.body.nmDataVenda;
    console.log("Data Venda" + data_Venda);

    db.ConsultaCsv()
        .then(function (csvs) {
            pedidoAut.formula(csvs, quantConsumida, codProdVenda, data_Venda); //Chamando a formula para pedidos automaticos
            resp.json("Saida Cadastrada com Sucesso!");
        })
        .catch(function (error) {
            console.log(error);
        });
});
app.post('/pedidosAut/estoque/:codProdinput', function (req, resp) { // Verifica o estoque
    var CodProd = req.params.codProdinput;//valor passado por parâmetro

    produtos.find({ cod_prod: CodProd }, function (error, produto) {
        if (error) {
            resp.send('Produto não cadastrado...: ' + error);
            console.log(error);
        } else {
            console.log(produto)
            resp.json(produto);
        }
    })
});
app.post('/api/orca', function (req, resp) {
    csv.find(function (error, result) { //Consulta CSV e cadastra pedido no Banco de Dados
        if (error) {
            console.log("Erro ao buscar todos os CSVs: " + error);
            resp.send("Erro no DB...: " + error)
        } else {
            resp.json(result);
        }
    });
});

app.post('/vendas', function (req, resp) {

    Vendas.find(function (error, result) {
        if (error) {
            console.log("Erro ao buscar todos os CSVs: " + error);
            resp.send("Erro no DB...: " + error)
        } else {
            resp.json(result);
        }
    });
});
app.post('/efetuaLogin', function (req, resp) {
    var login = req.body.InLogin;
    console.log("Login : " + login);
    usuarios.find({ email_user: login }, function (error, acesso) {
        if (error) {
            resp.send("erro" + error)
        }
        else {
            resp.json(acesso);
        }
    })
});

app.post('/login', (req, res) => {// testando Login
    var login = req.body.InLogin;
    var inPass = Number(req.body.InSenha);
    console.log(inPass);
    usuarios.find({ email_user: login }, function (error, result) {
        if (error) {
            res.send("erro" + error)
        }
        else {
            if (result.length > 0) {
                var validaSenha = Number(result[0].senha_user)
                if (validaSenha === inPass) {
                    res.send({
                        token: 'test123%yNgAkZlOhQd14s@a!@#(NDFO&##$gyr328%#$hF#%@&%#b2442618$#(*'
                    });
                }
                else {
                    console.log("Usuário ou senha inválidos!");
                    res.json("Usuário ou senha inválidos!")
                }
            }
            else {
                console.log("Usuário ou senha inválidos!");
                res.json("Usuário ou senha inválidos!")
            }
        }
    })

});
app.post('/solicitar/api/:codProdOrc', function (req, resp) {// Novo orçamento!!!
    console.log("chegou em solicita orçamento!!!!!!!")

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
    var codProdORc = req.params.codProdOrc;
    db.buscarProdutosPCod(codProdORc) // Consultar o estoque
        .then(function (docs) {
            var nome_Prod = docs[0].nome_Prod
            var cod_Prod = docs[0].cod_prod
            csv.find(function (error, result) { //Consulta CSV a fim de retirar os dados do fornecedor
                var NomeForn = result[0].Nome
                var CodForn = result[0].CodFornecedor

                if (error) {
                    console.log("Erro ao buscar todos os CSVs: " + error);
                    resp.send("Erro no DB...: " + error)
                } else {
                    const testeMail = {
                        from: 'stockpile.entra21@gmail.com', // Remetente
                        to: 'italoramonsp@gmail.com', // Destino
                        subject: 'Orçamento StockPile', // Assunto
                        html: '<h2>Olá' + `${NomeForn}` + '</h2>' // Corpo do e-mail
                            + '<br/>' + 'Por favor, a StockPile cordialmente requere um orçamento referente a: ' + '<br/>' +
                            '<b>' + 'Produto:' + '</b>' + ` ${nome_Prod}` + '<br/>' +
                            '<b>' + `Código:` + '</b>' + ` ${cod_Prod}` + '<br/>' +
                            '<b>' + `Quantidade:` + '</b>' + '<br/>' +
                            '<b>' + `Preço Unitário R$:` + '</b>' + '<br/>' +
                            '<b>' + `Lead Time necessário:` + '</b>' + '<br/>' + '<br/>' +
                            'Atenciosamente,' + '<br/>' +
                            '<h3>' + 'StockPile' + '</h3>'
                    };

                    transporte.sendMail(testeMail, function (err, info) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(info)

                            // ####### NOVO CSV #########

                            // setando as variáveis que receberão os valores do CSV

                            const createCsvWriter = require('csv-writer').createObjectCsvWriter;
                            const csvWriter = createCsvWriter({
                                path: '02_teste.csv',
                                header: [
                                    { id: 'Nome', title: 'Nome' },
                                    { id: 'CodFornecedor', title: 'CodFornecedor' },
                                    { id: 'CodCSV', title: 'CodCSV' },
                                    { id: 'LeadTime', title: 'LeadTime' },
                                    { id: 'Capacidade', title: 'Capacidade' },
                                    { id: 'CodProd', title: 'CodProd' },
                                ]
                            });

                            // Cod.CSV
                            var CodCSVRandom = ''
                            var cod1 = Math.floor(Math.random() * 10).toFixed(0)
                            var cod2 = Math.floor(Math.random() * 10).toFixed(0)
                            var cod3 = Math.floor(Math.random() * 10).toFixed(0)
                            CodCSVRandom += cod1 + cod2 + cod3

                            // Cod. LeadTime
                            var LeadRandom = ''
                            LeadRandom = Math.floor(Math.random() * 10).toFixed(0)

                            // Capacidade
                            var CapRandom = ''
                            var cod1 = Math.floor(Math.random() * 10).toFixed(0)
                            var cod2 = Math.floor(Math.random() * 10).toFixed(0)
                            CapRandom += cod1 + cod2

                            const data = [
                                {
                                    Nome: NomeForn,
                                    CodFornecedor: CodForn,
                                    CodCSV: CodCSVRandom,
                                    LeadTime: LeadRandom,
                                    Capacidade: CapRandom,
                                    CodProd: cod_Prod
                                }
                            ];

                            csvWriter
                                .writeRecords(data)
                                .then(function (docs) {
                                    var CSV = new csv()
                                    CSV.Nome = NomeForn
                                    CSV.CodFornecedor = CodForn
                                    CSV.CodCSV = CodCSVRandom
                                    CSV.LeadTime = LeadRandom
                                    CSV.Capacidade = CapRandom
                                    CSV.CodProd = cod_Prod

                                    CSV.save() // inserir no db do MongoDB
                                        .then(function () {
                                            console.log("CSV cadastrado com sucesso!")
                                        }).catch(function (err) {
                                            console.log("Erro no DB " + err)
                                        });
                                    resp.json("Orçamento solicitado com sucesso para o fornecedor   " + NomeForn + "!")
                                    console.log('O CSV foi criado com sucesso!!!!');
                                })
                                .catch(function (err) {
                                    console.log("Erro na adição ao DB do CSV " + err);
                                });

                        }
                    });
                }
            });
        }).catch(function (err) {
            console.log("Erro no DB " + err);
        });
});


app.post('/pedidos', function (req, resp) {/* Consulta Pedido */

    Pedido.find(function (error, result) {
        if (error) {
            console.log("Erro ao buscar todos os CSVs: " + error);
            resp.send("Erro no DB...: " + error)
        } else {
            resp.json(result);
        }
    });
});

app.get('/confirma/pedidos/:propCodProd', function (req, resp) {
    var NewCodProd = req.params.propCodProd
    var sliceProd = NewCodProd.slice(0, 3);
    var sliceQtd = NewCodProd.slice(3, 5);
    var slicePedido = NewCodProd.slice(6);
    console.log("sliceQtd" + sliceQtd);
    console.log("slicePedido" + slicePedido);

    console.log("SlicePedido: " + slicePedido);
    console.log("SliceQtd: " + sliceQtd);
    sliceQtd = parseFloat(sliceQtd)

    db.buscarProdutosPCod(sliceProd) // Consultar o estoque
        .then(function (docs) {
            console.log("docs É Docs + " + docs);
            var qtdEstoqueBanco = parseFloat(docs[0].qtd_Estoque)
            var attQtd = sliceQtd + qtdEstoqueBanco
            produtos.updateOne({ cod_prod: sliceProd }, { qtd_Estoque: attQtd }, function (err, result) {
                if (err == null) {
                    console.log("DOCS ABAIXO!!");
                    console.log(docs[0]);
                    console.log(docs[0].data);
                    /* Pedidos.find({slicePedido}) */
                    var produto = new PedidosArq()
                    produto.codPedidoArq = slicePedido;
                    produto.dataPed = docs[0].data;
                    produto.qtdPedArq = sliceQtd;
                    produto.cod_prod = docs[0].cod_prod;
                    produto.save();

                    resp.send("Pedido confirmado! ;)")
                } else {
                    console.log("Erro no update " + err)
                }
            });
        }).catch(function (err) {
            console.log("Erro no DB " + err);
        });
});

app.post('/pedidosArq', function (req, resp) {  //Excluir Produto

    PedidosArq.find(function (error, Pedido) {
        if (error) {
            resp.send('Pedido Error : ' + error);
            console.log(error);
        } else {
            console.log(Pedido)
            resp.json(Pedido)
        }
    });
})

app.post('/exclusao/:codProdExc', function (req, resp) {  //Excluir Produto
    console.log("=====================Rota Exclusao====================");
    var codExcluir = req.params.codProdExc;//cod exclusao

    produtos.deleteOne({ cod_prod: codExcluir }, function (error, produto) {
        if (error) {
            resp.send('Produto não cadastrado...: ' + error);
            console.log(error);
        } else {
            console.log(produto)
            resp.json("Produto deletado com sucesso!")
        }
    });
})
