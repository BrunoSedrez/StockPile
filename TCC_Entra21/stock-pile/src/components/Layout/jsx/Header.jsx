import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import "../cssLayout/IconeUsuario.css";

var display = 0;
function Header() {
  return (
    <div className="header">
      <div className="header-menu">
        <div className="titulo">
          <Link to="/">
            <img
              className="image"
              src="/img/StockPile.png"
              alt="Logo da StockPile"
              width="210"
              height="85"
            />
          </Link>
        </div>
        <ul>
          <li>
            <Link to="#" onClick={Usuario}>
              <i className="fas fa-user-circle"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div id="posiciona">
        <p></p>
        <Link to="#" onClick={Logout}>
          <button className="botoes"> LogOut </button>
        </Link>
      </div>
    </div>
  );
  function Usuario() {
    abrirDiv();
    function fechar() {
      if (display == 2) {
        document.getElementById("posiciona").style.display = "none";
        display = 0;
      }
    }
    function abrirDiv() {
      document.getElementById("posiciona").style.display = "block";
      display++;
      fechar();
    }
  }
  function Logout() {
    localStorage.clear();
    window.location.href = "/";
  }
}
export default Header;
