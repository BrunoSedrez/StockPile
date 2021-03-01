import { json } from 'body-parser';
import React, { useState } from 'react';
import '../CadastroProd/cadastro.css'

var cont = 0;
function ComponentCadastro(props) {

  const [Produtos, setProdutos] = React.useState([])

  React.useEffect(() => {

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/buscaProdutos");

    xhr.addEventListener("load", function () {

      var prods = xhr.responseText;
      var prodObj = JSON.parse(prods);
      //console.log("OBJ : " + prods);
      //var produtos = JSON.parse(prods);
      //console.log(prods);
      setProdutos(prodObj);
    });
    xhr.send();
  }); //Array vazio para quando terminar de carregar, caso dê falha, carrega a página e exibe sem nada 

  /*  React.useEffect(() => {
 
     var xhr = new XMLHttpRequest();
 
     xhr.open("POST", "/buscaProdutos");
 
     xhr.addEventListener("load", function () {
 
       var prods = xhr.responseText;
       var prodObj = JSON.parse(prods);
       //console.log("OBJ : " + prods);
       //var produtos = JSON.parse(prods);
       //console.log(prods);
       setProdutos(prodObj);
     });
     xhr.send();
   }) */

  /* }.then(result => {


  }).catch(error => {

  }) */

  return (
    <div id="validaCadastro">
      <div>
        <p className="TituloCadastro">Cadastro de Produtos</p>
        <form action="/cadastroImport" method="POST">
          <input type="number" className="form-control" id="idCodProd" name="nmCodProd" placeholder="Cód Produto" />
          <br />
          <input type="text" className="form-control" id="idDescrProd" name="nmDescrProd" placeholder="Descrição do Produto" />
          <br />
          <input type="number" className="form-control" id="idQtd" name="nmQtd" placeholder="Quantidade Atual" />
          <br />
          <input type="text" className="form-control" id="idData" name="nmData" placeholder="DD/MM/AAAA" />
          <br />
          <input type="number" className="form-control" id="idPorcentagem" name="nmPorcentagem" placeholder="Porcentagem de Segurança" />

          <br />
          <input type="button" className="btn btn-outline-dark" value="Cadastrar Produto" onClick={props.onCadastro} />
          {/*  <input type="button" className="btn btn-outline-dark" value="Atualizar Produto" onClick={props.onAlterar} /> */}
          <br /><br />
          <p>{props.statusProduto}</p>
        </form>
      </div>
      <div id="margin" className="text-center" >
        <table border={1} className="table table-striped" id="tbIdProdutos">
          <thead id="thHeaderTable">
            <tr className="trClPedido" /* style="background-color: dimgrey" */>
              <th scope="col" className="thClCod">Código do Produto</th>
              <th scope="col" className="thClDescricaoProd">
                Descrição do Produto
                            </th>
              <th scope="col" className="thClQtd">Quantidade em Estoque</th>
              <th scope="col" className="thClData">Data de Cadastro</th>
            </tr>
          </thead>
          <tbody id="tboIdLinha" className="tboIdLinha">
            {
              Produtos.map(produto => (
                <tr key={`01${produto._id}`}>
                  <td key={`02${produto._id}`}>{produto.cod_prod}</td>
                  <td key={`03${produto._id}`}>{produto.nome_Prod}</td>
                  <td key={`04${produto._id}`}>{produto.qtd_Estoque}</td>
                  <td key={`05${produto._id}`}>{produto.data}</td>
                </tr>
              ))
            }
            {props.tabela}
          </tbody>
        </table>
      </div >
    </div>
  )
}
function Cadastro() {

  const [tab, setTab] = React.useState([]) // já é uma tabela
  //console.log({ tab });

  const [statusProduto, setStatusProduto] = React.useState("");

  const validaProduto = function () {
    var produto = Number(document.getElementById("idCodProd").value);
    var descrProd = document.getElementById("idDescrProd").value;
    var qtd = Number(document.getElementById("idQtd").value);
    var data = document.getElementById("idData").value;
    var porcentagem = Number(document.getElementById("idPorcentagem").value);
    console.log(porcentagem);
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/cadastroValida/" + produto);

    xhr.addEventListener("load", function () {

      var resposta = xhr.responseText;
      console.log(resposta);
      var resp = JSON.parse(resposta);
      console.log(resp.length);

      if (resp.length > 0) { //Testa se o produto foi encontrado no DB
        setStatusProduto("Produto Já Cadastrado");
      } else {
        cadastrarProduto(produto, descrProd, qtd, data, porcentagem);
        setStatusProduto("Produto Cadastrado com sucesso!");
      }
    });
    xhr.send();
  };

  var cadastrarProduto = function (produto, descrProd, qtd, data, porcentagem) { /* -----  cadastrar o usuario ------*/

    cont++;
    console.log(cont);
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/cadastroImport", true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");// Envia variaveis junto com o send 

    xhr.addEventListener("load", function () {
      var resposta = xhr.responseText;
      var resp = JSON.parse(resposta);
      console.log(resp);
    });
    xhr.send("nmCodProd=" + produto + "&nmDescrProd=" + descrProd + "&nmQtd=" + qtd + "&nmData=" + data + "&nmPorcentagem=" + porcentagem);

  }
  return (

    <div className="main-container">

      <div className="Cadastro">
        <ComponentCadastro onCadastro={validaProduto} statusProduto={statusProduto} tabela={tab} /* tabInicial={tabInicial} tabInicial2={tabInicial2} */ />
      </div>
    </div>
  );
}

export default Cadastro;
