import React, { useState } from 'react';
import './histSaidas.css';

function HistVendas() {

  const [HistVendas, setVendas] = React.useState([])

  React.useEffect(() => {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/vendas");

    xhr.addEventListener("load", function () {

      var vendas = xhr.responseText;
      var respObj = JSON.parse(vendas);
      console.log(respObj)
      setVendas(respObj)
    });

    xhr.send();
  })

  return (
    <div className="main-container">

      <h2 className="TituloHistVend">Histórico de Saídas</h2>
      <br />
      < table border={1} className="table table-hover" id="tbIdProdutos" >
        <thead id="thHeaderTable">
          <tr className="trClPedido" /* style="background-color: dimgrey" */>
            <th scope="col" className="thClCod">Código de Saída</th>
            <th scope="col" className="thClDescricaoProd">
              Data Saída
                            </th>
            <th scope="col" className="thClQtd">Quantidade Consumida</th>
            <th scope="col" className="thClData">Código de Produto</th>
          </tr>
        </thead>
        <tbody id="tboIdLinhaVenda" className="tboIdLinhaVenda">
          {
            HistVendas.map(venda => (
              <tr>
                <td className="ClHistVendaA" key={`02${venda._id}`}>{venda.cod_prod}</td>
                <td key={`02${venda._id}`}>{venda.data}</td>
                <td key={`03${venda._id}`}>{venda.quant_Consumida} </td>
                <td key={`04${venda._id}`}>{venda.cod_prod}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div >
  )
}

export default HistVendas;