
import React, { useState } from 'react';
import '../UltimosPedidos/pedidos.css';
var button = 0;

var teste = ''
var arrPedidos = []

function Pedidos() {

  const [lerMaisPedFornA, setLerMaisPedFornA] = useState(false);
  const [lerMaisPedFornB, setLerMaisPedFornB] = useState(false);
  const [lerMaisPedFornC, setLerMaisPedFornC] = useState(false);
  const [lerMaisPedFornD, setLerMaisPedFornD] = useState(false);
  const [lerMaisPedFornE, setLerMaisPedFornE] = useState(false);

  const ConteudoOrc1 = <div>
    <p className="ClPedidoA">
    </p>
  </div>
  const ConteudoOrc2 = <div>
    <p className="ClPedidoB">
    </p>
  </div>

  const ConteudoOrc3 = <div>
    <p className="ClPedidoC"></p>
  </div>

  const ConteudoOrc4 = <div>
    <p className="ClPedidoD"></p>
  </div>

  const ConteudoOrc5 = <div>
    <p className="ClPedidoE"></p>
  </div>
  // Botão confirma A
  function Botao(props) {
    switch (props) {
      case 0:
        if (pedFornA == 'Fornecedor A ') {
          document.getElementById("IdConfirma").style.display = "block"
        } else {
          document.getElementById("IdConfirma").style.display = "none"
        }
        break;
      case 1:
        if (pedFornB == 'Fornecedor B ') {
          document.getElementById("IdConfirma2").style.display = "block"
        } else {
          document.getElementById("IdConfirma2").style.display = "none"
        }
        break
      case 2:
        if (pedFornC == 'Fornecedor C ') {
          document.getElementById("IdConfirma3").style.display = "block"
        } else {
          document.getElementById("IdConfirma3").style.display = "none"
        }
        break
      case 3:
        if (pedFornD == 'Fornecedor D ') {
          document.getElementById("IdConfirma4").style.display = "block"
        } else {
          document.getElementById("IdConfirma4").style.display = "none"
        }
        break
      case 4:
        if (pedFornE == 'Fornecedor E ') {
          document.getElementById("IdConfirma5").style.display = "block"
        } else {
          document.getElementById("IdConfirma5").style.display = "none"
        }
        break
      default:
        break;
    }
  }
  const [pedidoA, setPedidoA] = React.useState("");
  const [pedidoB, setPedidoB] = React.useState("");
  const [pedidoC, setPedidoC] = React.useState("");
  const [pedidoD, setPedidoD] = React.useState("");
  const [pedidoE, setPedidoE] = React.useState("");
  // Confirmar pedido e atualizar o banco
  var Confirma = function (props) {
    
   
    var propCodProd = props.cod_prod
    var propQtdTotal = props.qtd_Total
    var propCodPedido = props.cod_Ped

    if (button == 0) {
      document.getElementById("teste1").style.transitionDuration = "3s";
      document.getElementById("teste1").style.borderColor = "green";
    }
    if (button == 1) {
      document.getElementById("teste2").style.transitionDuration = "3s";
      document.getElementById("teste2").style.borderColor = "green";
    }
    if (button == 2) {
      document.getElementById("teste3").style.transitionDuration = "3s";
      document.getElementById("teste3").style.borderColor = "green";
    }
    if (button == 3) {
      document.getElementById("teste4").style.transitionDuration = "3s";
      document.getElementById("teste4").style.borderColor = "green";
    }
    if (button == 4) {
      document.getElementById("teste5").style.transitionDuration = "3s";
      document.getElementById("teste5").style.borderColor = "green";
    }

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/confirma/pedidos/" + propCodProd + propQtdTotal + propCodPedido);

    // Envia a informação do cabeçalho junto com a requisição.
    /*     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); */

    xhr.addEventListener("load", function () {
      var resposta = xhr.responseText;
      console.log(resposta)
    });

    xhr.send();
  }

  const pedFornA = lerMaisPedFornA ? 'Pedido 1 ' : 'Fornecedor A '
  const pedFornB = lerMaisPedFornB ? 'Pedido 2 ' : 'Fornecedor B '
  const pedFornC = lerMaisPedFornC ? 'Pedido 3 ' : 'Fornecedor C '
  const pedFornD = lerMaisPedFornD ? 'Pedido 4 ' : 'Fornecedor D '
  const pedFornE = lerMaisPedFornE ? 'Pedido 5 ' : 'Fornecedor E '

  // validar Pedidos
  var validaPedido = function (props) {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/pedidos");


    xhr.addEventListener("load", function () {

      var resposta = xhr.responseText;
      var resp = JSON.parse(resposta);
      console.log(resp)
      console.log("props é " + props)
      button = props;
      // Queremos que o resultado apareça em cada linha[props]
      console.log("Carregou o DB!!!")
      teste = 'não nulo'
      if (resp[props] == undefined) {
        teste = "undefined"
        var newTeste = ''
        setPedidoD(newTeste);
        setPedidoE(newTeste);
      } else {
        teste = `Código: ${resp[props].cod_Ped} \n
        Data Pedido: ${resp[props].data_Ped} \n
        Quantidade: ${resp[props].qtd_Total} \n
        Código Produto: ${resp[props].cod_prod}`
        var newTeste = teste.split('\n').map(str => <p class="PClass">{str}</p>); // divide o resultado e retorna como um parágrafo

        // Passar os valores para o array
        arrPedidos = resp[props]

        // Jogar na tela
        if (props == 0) {
          setPedidoA(newTeste);
        } else if (props == 1) {
          setPedidoB(newTeste);
        } else if (props == 2) {
          setPedidoC(newTeste);
        } else if (props == 3) {
          setPedidoD(newTeste);
        } else {
          setPedidoE(newTeste);
        }
      }
    });

    xhr.send();
  }
  return (
    <div className="main-container">
      <div className="App">
        <h1 className="TituloPed">Últimos Pedidos Realizados</h1>

        <div className="ClDivPd1" id="teste1">

          <a className="ClPedidoA" onClick={() => { setLerMaisPedFornA(!lerMaisPedFornA); { validaPedido(0) }; { Botao(0) }; }}>
            <h2 className="H2Class">{pedFornA}</h2>
          </a>
          {lerMaisPedFornA && pedidoA}

          <div>
            <input type="button" id="IdConfirma" className="teste" value="Confirma" onClick={() => { Confirma(arrPedidos) }} />
            <br />

          </div>
        </div>

        <div className="ClDivPd2" id="teste2">

          <a className="ClPedidoB" onClick={() => { setLerMaisPedFornB(!lerMaisPedFornB); { validaPedido(1) }; { Botao(1) }; }}>
            <h2 className="H2Class">{pedFornB}</h2>
          </a>
          {lerMaisPedFornB && pedidoB}

          <div>
            <input type="button" id="IdConfirma2" className="teste" value="Confirma" onClick={() => { Confirma(arrPedidos) }} />
            <br />
          </div>

        </div>

        <div className="ClDivPd3" id="teste3">

          <a className="ClPedidoC" onClick={() => { setLerMaisPedFornC(!lerMaisPedFornC); { validaPedido(2) }; { Botao(2) }; }} >
            <h2 className="H2Class">{pedFornC}</h2>
          </a>
          {lerMaisPedFornC && pedidoC}

          <div>
            <input type="button" id="IdConfirma3" className="teste" value="Confirma" onClick={() => { Confirma(arrPedidos) }} />
            <br />
          </div>

        </div>

        <div className="ClDivPd4" id="teste4">

          <a className="ClPedidoD" onClick={() => { setLerMaisPedFornD(!lerMaisPedFornD); { validaPedido(3) }; { Botao(3) }; }} >
            <h2 className="H2Class">{pedFornD}</h2>
          </a>
          {lerMaisPedFornD && pedidoD}

          <div>
            <input type="button" id="IdConfirma4" className="teste" value="Confirma" onClick={() => { Confirma(arrPedidos) }} />
            <br />
          </div>

        </div>

        <div className="ClDivPd5" id="teste5">

          <a className="ClPedidoE" onClick={() => { setLerMaisPedFornE(!lerMaisPedFornE); { validaPedido(4) }; { Botao(4) }; }} >
            <h2 className="H2Class">{pedFornE}</h2>
          </a>
          {lerMaisPedFornE && pedidoE}

          <div>
            <input type="button" id="IdConfirma5" className="teste" value="Confirma" onClick={() => { Confirma(arrPedidos) }} />
            <br />
          </div>

        </div>

      </div>
    </div>
  )
}
export default Pedidos;