import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <li className="item">
          <Link to="/" className="menu-botao">
            <i className="fas fa-desktop"></i>
            <span>Home</span>
          </Link>
        </li>
        <li className="item" id="genEstoque">
          <a href="#genEstoque" className="menu-botao">
            <i className="fas fa-edit"></i>
            <span>
              Gerenciamento de Estoque
              <i className="fas fa-chevron-down drop-down"></i>
            </span>
          </a>
          <div className="sub-menu">
            <Link to="cadastro">
              <i className="fas fa-address-card"></i>
              <span>Cadastrar Produto</span>
            </Link>
            <Link to="excluir">
              <i className="fas fa-address-card"></i>
              <span>Remover Produto</span>
            </Link>
          </div>
        </li>
        <li className="item" id="config">
          <a href="#config" className="menu-botao">
            <i className="fas fa-edit"></i>
            <span>
              Orçamentos e Pedidos
              <i className="fas fa-chevron-down drop-down"></i>
            </span>
          </a>
          <div className="sub-menu">
            <Link to="orcamentos">
              <i className="fas fa-lock"></i>
              <span>Orçamentos de Fornecedores</span>
            </Link>
            <Link to="pedidos">
              <i className="fas fa-language"></i>
              <span>Últimos Pedidos</span>
            </Link>
          </div>
        </li>
        <li className="item">
          <Link to="vendas" className="menu-botao">
            <i className="fas fa-comment-dollar"></i>
            <span>Saídas</span>
          </Link>
        </li>
        <li className="item">
          <Link className="menu-botao" to="/histVendas">
            <i className="fas fa-comment-dollar"></i>
            <span>Histórico de Saídas</span>
          </Link>
        </li>
        <li className="item">
          <Link className="menu-botao" to="/pedidosArq">
            <i className="fas fa-edit"></i>
            <span>Pedidos Arquivados</span>
          </Link>
        </li>
      </div>
    </div>
  );
}
export default Sidebar;
