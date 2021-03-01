import React, { useState } from 'react';
import '../UltimosOrcamentos/orcamentos.css'

var teste = ''

function Orcamentos(props) {
  const [lerMaisOrcFornA, setRerMaisOrcFornA] = useState(false);
  const [lerMaisOrcFornB, setRerMaisOrcFornB] = useState(false);
  const [lerMaisOrcFornC, setRerMaisOrcFornC] = useState(false);
  const [lerMaisOrcFornD, setRerMaisOrcFornD] = useState(false);

  const [lerMaisSolicOrc, setRerMaisSolicOrc] = useState(false);

  const ConteudoOrc1 = <div>
    <p className="ClConteudoOrc1">
    </p>
  </div>
  const ConteudoOrc2 = <div>
    <p className="ClConteudoOrc2">
    </p>
  </div>

  const ConteudoOrc3 = <div>
    <p className="ClConteudoOrc3">
    </p>
  </div>

const ConteudoOrc4 = <div>
<p className="ClConteudoOrc4">
</p>
</div>


  const orcFornA = lerMaisOrcFornA ? 'Orçamento 1 ' : 'Orçamento 1 '
  const orcFornB = lerMaisOrcFornB ? 'Orcamento 2 ' : 'Orçamento 2 '
  const orcFornC = lerMaisOrcFornC ? 'Orcamento 3 ' : 'Orçamento 3 '
  const orcFornD = lerMaisOrcFornD ? 'Orcamento 4 ' : 'Orçamento 4 '

  const solicitaOrc = lerMaisSolicOrc ? 'Solicitar Orçamento ' : 'Solicitar Orçamento '
  const [statusOrca, setStatusOrca] = React.useState("");
  const [orcamentoA, setOrcamentoA] = React.useState("");
  const [orcamentoB, setOrcamentoB] = React.useState("");
  const [orcamentoC, setOrcamentoC] = React.useState("");
  const [orcamentoD, setOrcamentoD] = React.useState("");


  var validaOrcamento = function (props) {

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/api/orca");

    xhr.addEventListener("load", function () {

      var resposta = xhr.responseText;
      var resp = JSON.parse(resposta);
      console.log(resp)
      console.log("props é " + props)
      // Queremos que o resultado apareça em cada linha
      console.log("Carregou o DB!!!")
      teste = 'não nulo'
      if (resp[props] == undefined) {
        teste = "undefined"
        var newTeste = ''
        setOrcamentoD(newTeste);
      } else {
      teste = `Fornecedor: ${resp[props].Nome} \n
      Cod.Fornecedor: ${resp[props].CodFornecedor} \n
      Cod.CSV: ${resp[props].CodCSV} \n
      Lead Time: ${resp[props].LeadTime} Dias \n
      Capacidade: ${resp[props].Capacidade} Unidades\n
      Cod.Produto: ${resp[props].CodProd}`
      var newTeste = teste.split('\n').map(str => <p>{str}</p>); // divide o resultado e retorna como um parágrafo
      // Chamar cada caso
      if (props == 0) {
        setOrcamentoA(newTeste);
      } else if (props == 1) {
        setOrcamentoB(newTeste);
      } else if (props == 2) {
        setOrcamentoC(newTeste);
      } else {
        setOrcamentoD(newTeste)
      }
    }
    });

    xhr.send();
  }
  // Chamar Server
  var Solicitar = function () {
    var codProdOrc = document.getElementById('idCodProd').value;

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/solicitar/api/" + codProdOrc);
    // Envia a informação do cabeçalho junto com a requisição.
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.addEventListener("load", function () {
      console.log("ChegouCOnsole");
      var resposta = xhr.responseText;
      var resp = JSON.parse(resposta)
      console.log(resposta)
       console.log(resp)
      setStatusOrca(resp)
    });

    xhr.send();

  }
  // Requerer Novo Pedido
  var IncluirSocilita = function () {

    var ClButton = document.querySelector('.ClButtonSolicita');
    ClButton.style.display = "inline-block";


    var ClInputCodProd = document.querySelector('.ClInputCodProd');
    ClInputCodProd.style.display = "inline-block";

  }

  return (
    <div className="main-container">
      {/* <div className="card"> */}
      <div className="App">
        <h2 className="TituloHistOrc">Histórico de Orçamentos</h2>
        <div className="clDivOrc1">
          <p className="ClOrcFornA" onClick={() => { setRerMaisOrcFornA(!lerMaisOrcFornA); { validaOrcamento(0) } }}>
            <h2 className="h2TagOrc">{orcFornA}</h2>
          </p>
          {lerMaisOrcFornA && orcamentoA}  {/* chamar as funções */}
        </div>
        <br />

        <div className="clDivOrc2">
          <p className="ClOrcFornB" onClick={() => { setRerMaisOrcFornB(!lerMaisOrcFornB); { validaOrcamento(1) } }}>
            <h2 className="h2TagOrc">{orcFornB}</h2>
          </p>
          {lerMaisOrcFornB && orcamentoB}  {/* chamar as funções */}
        </div>
        <br />
        <div className="clDivOrc3">
          <p className="ClOrcFornC" onClick={() => { setRerMaisOrcFornC(!lerMaisOrcFornC); { validaOrcamento(2) } }} >
            <h2 className="h2TagOrc">{orcFornC}</h2>
          </p>
          {lerMaisOrcFornC && orcamentoC}  {/* chamar as funções */}
        </div>
        <br />

        <div className="clDivOrc4">
          <p className="ClOrcFornD" onClick={() => { setRerMaisOrcFornD(!lerMaisOrcFornD); { validaOrcamento(3) } }}>
            <h2 className="h2TagOrc">{orcFornD}</h2>
          </p>
          {lerMaisOrcFornD && orcamentoD}  {/* chamar as funções */}
        </div>
        <br />

        <div className="clDivOrc5">
          <br />
          <p className="ClSolicita" onClick={() => { setRerMaisSolicOrc(!lerMaisSolicOrc); { IncluirSocilita() } setStatusOrca(!statusOrca) }} >
            <h2 className="h2TagOrc">{solicitaOrc}</h2>
          </p>
          {lerMaisSolicOrc}
          <br />

          <input type="number" className="ClInputCodProd" name="nmIdCodProd" id="idCodProd" placeholder="Cod. Produto"></input>
          <br /><br />

          <input type="button" className="ClButtonSolicita" id="idSocilita" value="Solicitar Orçamento" onClick={() => { Solicitar() }} />
          <br /><br />
          <p>{statusOrca}</p>
          <br />
        </div>
      </div>
    </div>
    /*  </div > */

  )
}

export default Orcamentos;