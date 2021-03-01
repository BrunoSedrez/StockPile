import React from 'react';
/* import '../CadUsuario/cadastro.css'; */
import PropTypes from 'prop-types';

function CadUsuario({ setToken }) {
  return (
    <div className="main-container">
      <div id="idDivValida">
        <div id="idTitulo">
          StockPile <i id="idSolution">solution</i>
        </div>
        <form id="idFormValida" action="/cadastroUser" method="POST" >
          <div class="ClUserSenha" id="divCep">
            <label for="InCEP">CEP:</label>
            <br /><br />
            <input type="number" name="InCEP" class="ClInput" />
            <br /><br />
          </div>
          <div id="Entrada " class="ClUserSenha" >
            <label for="InNmEmpresa">Nome:</label>
            <br /><br />
            <input type="text" name="InNmEmpresa" class="ClInput" />

            <label for="InCNPJ">CNPJ:</label>
            <br /><br />
            <input type="number" name="InCNPJ" class="ClInput" />

            <label for="InEndereco">Endereço:</label>
            <br /><br />
            <input type="text" name="InEndereco" class="ClInput" />

            <label for="InComplemento">Complemento:</label>
            <br /><br />
            <input type="number" name="InComplemento" class="ClInput" />
            <br /><br />
          </div>
          <div class="ClUserSenha">
            <label for="InNmUsuario">Nome do Usuário:</label>
            <br /><br />
            <input type="text" name="InNmUsuario" class="ClInput" />

            <label for="InCPF">CPF:</label>
            <br /><br />
            <input type="number" name="InCPF" class="ClInput" />

            <label for="InEmail">Email</label>
            <br /><br />
            <input type="email" name="InEmail" class="ClInput" />
          </div>

          <div class="ClUserSenha">
            <label for="idInputSenha">Senha</label>
            <input type="password" class="ClInput" name="idInputSenha" />

            <label for="idConfirmaSenha">Confirmar Senha</label>
            <input type="password" class="ClInput" name="idConfirmaSenha" />
          </div>
          <div class="ClUserSenha">
            <input type="submit" id="idLoginButton" class="ClLoginButton disabled" value="Cadastrar" />
          </div>
        </form>
      </div>
    </div>
  )

  function cadastrarUsuario() {

    const token = { "token": "test123%yNgAkZlOhQd14s@a!@#(NDFO&##$gyr328%#$hF#%@&%#b2442618$#(*" };
    setToken(token);
  }
}

CadUsuario.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default CadUsuario;