import React, { useState } from 'react';
import './PedidosArq.css';

function PedidosArq() {

    const [PedidosArq, setPedidosArq] = React.useState([])

    React.useEffect(() => {
        var xhr = new XMLHttpRequest();

        xhr.open("POST", "/pedidosArq"); //PedidosArq

        xhr.addEventListener("load", function () {

            var vendas = xhr.responseText;
            var respObj = JSON.parse(vendas);
            console.log(respObj)
            setPedidosArq(respObj)
        });
        xhr.send();
    })

    return (
        <div className="main-container">
            <h2 className="TituloPedidosArq">Pedidos Arquivados</h2>
            <br />
            < table border={1} className="table table-hover" id="tbIdProdutos" >
                <thead id="thHeaderTable">
                    <tr className="trClPedidosArq" /* style="background-color: dimgrey" */>
                        <th scope="col" className="thClCodSaida">Código de Saída</th>
                        <th scope="col" className="thClDataSaida">
                            Data Saída
                            </th>
                        <th scope="col" className="thClQtdonsu">Quantidade Consumida</th>
                        <th scope="col" className="thClCodProd">Código de Produto</th>
                    </tr>
                </thead>
                <tbody id="tboIdPedidosArq" className="tboIdPedidosArq">
                    {
                        PedidosArq.map(pedido => (
                            < tr >
                                <td className="ClPedidosArq" key={`02${pedido._id}`}>{pedido.codPedidoArq}</td>
                                <td key={`02${pedido._id}`}>{pedido.dataPed}</td>
                                <td key={`03${pedido._id}`}>{pedido.qtdPedArq} </td>
                                <td key={`04${pedido._id}`}>{pedido.cod_prod}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}

export default PedidosArq;