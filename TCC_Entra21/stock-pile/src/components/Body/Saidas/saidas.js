import React, { useState } from 'react';
import '../Saidas/saidas.css'

function ComponentSaidas(props) {
  return (
    <form action="/pedidosAut" method="POST">
      <p className="TituloSaidas">Saídas</p>
      <input type="number" className="ClCodProdVend" id="idCodProd" name="nmCodProd" placeholder="Código do Produto" />
      <br /><br />
      <p>{props.statusProduto}</p>

      <input type="button" className="ClButtonValidaV" id="idValidaButton" value="Verificar" onClick={props.onValida}></input>
      <br /><br />
      <input className="ClVendas" type="number" id="idQtdVendida" name="nmQtdVendido" placeholder="Quantidade Vendida" disabled={true} />
      <br /><br />
      <input type="text" className="ClDataInput" id="idDataVenda" name="nmDataVenda" placeholder="DD/MM/AAAA" disabled={true} ></input>
      <span class="ClErro">Valor maior que o disponível em estoque. Por favor, tente novamente.</span>
      <br /><br />
      <input type="button" className="ClButtonVenda" id="idVendaButton" value="Vender" onClick={props.onVenda}></input>
      <br /><br />
      <p>{props.statusSaida}</p>
    </form>
  )
}

function Vendas() {

  /* -----  valida o produto  -----------------------------------------------------
    *      
    */
  const [statusProduto, setStatusProduto] = React.useState("");
  const [statusSaida, setStatusSaida] = React.useState("");


  var valida = function () {
    var codProdinput = document.getElementById('idCodProd').value;
    var ClVendas = document.querySelector('.ClVendas');
    var ClData = document.querySelector('.ClDataInput');
    verificaEstoque(codProdinput, ClVendas, ClData)
  }
  // Variável global, valor de estoque para comparar com a venda
  var qtdServer = 0
  var qtdTotalServer = 0
  var porcenBanco = 0
  var porcenMin = 0
  var textoVerifica = ''

  var verificaEstoque = function (codProdinput, ClVendas, ClData) {
    /* console.log(user + " " + pass); */
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/pedidosAut/estoque/" + codProdinput);

    xhr.addEventListener("load", function () {

      var resposta = xhr.responseText;
      //console.log("Resposta: " + xhr.response);
      //console.log("Texto" + xhr.responseText);
      var resp = JSON.parse(resposta);

      if (resp.length > 0) { //Testa se o Produto foi encontrado no DB
        ClVendas.disabled = false;
        ClData.disabled = false;

        qtdServer = resp[0].qtd_Estoque
        qtdTotalServer = resp[0].qtd_Total
        porcenBanco = ((qtdServer / qtdTotalServer) * 100).toFixed(2);
        porcenMin = resp[0].porcentagem
        // console.log("Quantidade em estoque " + qtdServer)

        if (porcenBanco > porcenMin) {
          textoVerifica = `Produto cadastrado e com ${resp[0].qtd_Estoque} unidades em estoque. \n
          Isso representa ${porcenBanco}%  do estoque total`
          var msg = textoVerifica.split('\n').map(str => <p>{str}</p>);
          setStatusProduto(msg)

        } else {
          textoVerifica = `Produto cadastrado e com ${resp[0].qtd_Estoque} unidades em estoque. \n
          Isso representa ${porcenBanco}%  do estoque total. \n
          Pedido ao fornecedor foi realizado!`
          var msgPedido = textoVerifica.split('\n').map(str => <p>{str}</p>);
          setStatusProduto(msgPedido)
        }
      } else {
        setStatusProduto("Produto não cadastrado");
      }
    });

    xhr.send();
  }

  // ####### Verificar Venda ########

  var vender = function () {
    var qtdeVendida = document.getElementById('idQtdVendida').value;
    var codProdinput = document.getElementById('idCodProd').value;
    var dataVenda = document.getElementById('idDataVenda').value;
    console.log(dataVenda);
    // Retirar o valor de estoque vindo do banco
    console.log(statusProduto[0].props.children)
    console.log(statusProduto)
    var dividir = statusProduto[0].props.children.split(' ', 5);

    var numEstoqueString = parseFloat(dividir[4])
    console.log(numEstoqueString)
    // quando der erro
    var msgErro = document.querySelector('.ClErro');
    var inputVenda = document.querySelector('#idQtdVendida');

    // Se o valor da venda for maior que o estoque
    if (qtdeVendida > numEstoqueString) {
      msgErro.style.display = "inline-block";
      inputVenda.style.border = "1px solid #f74040";
      setStatusSaida('')

    } else { // caso estiver tudo certo...
      msgErro.style.display = "none";
      inputVenda.style.border = "1px solid #000000";

      var xhr = new XMLHttpRequest();

      xhr.open("POST", "/pedidosAut/");
     
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Envia a informação do cabeçalho junto com a requisição.

      xhr.addEventListener("load", function () {

        var resposta = xhr.responseText;
        var resp = JSON.parse(resposta);

        console.log(resp);

        setStatusSaida(resp)
        
        var xhrEst = new XMLHttpRequest();// ########## CONSULTAR ESTOQUE NOVAMENTE #########

        xhrEst.open("POST", "/pedidosAut/estoque/" + codProdinput);
    
        xhrEst.addEventListener("load", function () {
    
          var respostaEst = xhrEst.responseText;
          var respEst = JSON.parse(respostaEst);
    
          if (respEst.length > 0) { //Testa se o Produto foi encontrado no DB
    
            qtdServer = respEst[0].qtd_Estoque
            qtdTotalServer = respEst[0].qtd_Total
            porcenBanco = ((qtdServer / qtdTotalServer) * 100).toFixed(2);
            porcenMin = respEst[0].porcentagem
    
            if (porcenBanco > porcenMin) {
              textoVerifica = `Produto cadastrado e com ${qtdServer} unidades em estoque. \n
              Isso representa ${porcenBanco}%  do estoque total`
              var newTeste = textoVerifica.split('\n').map(str => <p>{str}</p>);
              setStatusProduto(newTeste)
    
            } else {
              textoVerifica = `Produto cadastrado e com ${qtdServer} unidades em estoque. \n
              Isso representa ${porcenBanco}%  do estoque total. \n
              Pedido ao fornecedor foi realizado!`
              var newTeste = textoVerifica.split('\n').map(str => <p>{str}</p>);
              setStatusProduto(newTeste)
            }
          } else {
            setStatusProduto("Produto não cadastrado");
          }
        });
    
        xhrEst.send();

      })

      xhr.send("nmCodProd=" + codProdinput + "&nmQtdVendido=" + qtdeVendida + "&nmDataVenda=" + dataVenda); // utilizar os valores do form
    }

  }
  return (

    <div className="main-container">
        <div className="App">
          <ComponentSaidas onValida={valida} statusProduto={statusProduto} statusSaida={statusSaida} onVenda={vender} />
        </div>
      </div>
  );
}

export default Vendas;
