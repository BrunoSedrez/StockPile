import React, { useState } from 'react';
import './excluir.css'

function Teste(props) {
  return (

    <form action="/exclusao" method="POST">
      <p className="TagTituloExcluir">Excluir Produto</p>
      <input type="number" className="form-control" id="idCodDeletar" name="nmCodDeletar" placeholder="Código do Produto" />
      <br /><br />
      <p>{props.statusExcluir}</p>
      <br />
      <input type="button" className="ClButtonDeletar" id="idDeletarButton" value="Excluir do Estoque" onClick={props.onDeletar}></input>
      <br /> <br />
      <p id="ParaExcluir">Tenha cuidado, essa ação irá deletar o produto do estoque!</p>
    </form>
  )
}
function Excluir() {

  /* -----  valida o produto  -----------------------------------------------------
    *
    */
  const [statusExcluir, setStatusExcluir] = React.useState("");

  var deletarProd = function () {
    var codProdExc = document.getElementById('idCodDeletar').value;

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/exclusao/" + codProdExc);

    xhr.addEventListener("load", function () {

      var resposta = xhr.responseText;
      console.log("resposta do server é " + resposta)

      var respObj = JSON.parse(resposta)
      console.log(respObj)
      setStatusExcluir(respObj)
    });

    xhr.send();
  }
  return (

    <div className="main-container">

      {/* <div className="App"> */}


      <Teste onDeletar={deletarProd} statusExcluir={statusExcluir} />
      {/* </div> */}
    </div>
  );
}

export default Excluir;