import React, { useState } from 'react';
import Home from './components/Body/Home/Home';
import Cadastro from './components/Body/CadastroProd/Cadastro';
import Excluir from './components/Body/Excluir/Excluir.js';
import Orcamentos from './components/Body/UltimosOrcamentos/Orcamentos';
import Pedidos from './components/Body/UltimosPedidos/Pedidos';
import histVendas from './components/Body/HistVendas/HistSaidas';
import Vendas from './components/Body/Saidas/saidas';
import Header from './components/Layout/jsx/Header';
import Sidebar from './components/Layout/jsx/Sidebar';
import useToken from './useToken';
import Login from './components/Body/Login/login';
import PedidosArq from './components/Body/PedidosArquivados/PedidosArq';
import CadastroUser from './components/Body/CadUsuario/CadUsuario'
import { Switch, Route } from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css';

const Routes = function () {

    const [Header_Layout, setHeader] = React.useState(<Header />);
    const [Sidebar_Layout, setSidebar] = React.useState(<Sidebar />);
    const { token, setToken } = useToken();

    /* if (!token) {
        return ( */
    //<Login setToken={setToken} />

    /*   )
  } */
    if (token) {
        return (
            <div>
                {Header_Layout}
                {Sidebar_Layout}
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/cadastro" component={Cadastro} exact />
                    <Route path="/excluir" component={Excluir} exact />
                    <Route path="/orcamentos" component={Orcamentos} exact />
                    <Route path="/pedidos" component={Pedidos} exact />
                    <Route path="/pedidosArq" component={PedidosArq} exact />
                    <Route path="/histVendas" component={histVendas} exact />
                    <Route path="/vendas" component={Vendas} exact />
                    <Route component={() => <div>Erro 404 - Página não encontrada</div>} />
                </Switch>
                {/* {Footer_Layout} */}
            </div>
        );
    }
    else {
        return (
            <Switch>
                <Login setToken={setToken} />
                <CadastroUser setToken={setToken}/>
            </Switch>
        )
    }
}
export default Routes;