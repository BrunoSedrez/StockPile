import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Login/styleLogin.css';
import { Link } from "react-router-dom";

function Login({ setToken }) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    return (
        <div >
            <div class="ClLogin">

                <div id="idTitulo">
                    StockPile <i id="idSolution">solution</i>
                </div>
                <form id="idFormValida"  >
                    <div class="ClUserSenha">
                        <label for="idInput"> E-mail</label>
                        <div id="idDivInput">
                            <input type="text" class="ClInput" name="InLogin" id="idInputUser" onChange={e => setUserName(e.target.value)} />
                        </div>
                    </div>
                    <div class="ClUserSenha">
                        <label for="idSenha">Senha</label>
                        <div id="idDivInput">
                            <input type="password" name="InSenha" class="ClSenha" id="idInputSenha" onChange={e => setPassword(e.target.value)} />
                            <br /><br />
                            <span class="ClErro">Usuario ou senha incorretos. Tente novamente</span>
                        </div>
                    </div>
                    <div class="ClUserSenha">
                        <br />
                     Não consegue acessar?  <a id="recSenha" href="/">Recuperar Senha</a>
                        <br />
                        <Link to="/"><input type="button" class="ClLoginButton" id="idLoginButton" value="Login" onClick={validar} /></Link>

                        <Link to="/cadastroUser"><input type="button" id="idCadastroButton" value="cadastro" /></Link>
                    </div>
                </form>
            </div >
        </div >
    )
    function validar() {
        var inUser = document.getElementById('idInputUser').value;
        var inPass = document.getElementById('idInputSenha').value;

        var msgErro = document.querySelector('.ClErro');// quando der erro
        var ClInput = document.querySelector('.ClInput');
        var ClSenha = document.querySelector('.ClSenha');
        console.log(inPass + "+" + inUser);

        var xhr = new XMLHttpRequest();

        xhr.open("POST", "/login");

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  // Envia a informação do cabeçalho junto com a requisição.

        xhr.addEventListener("load", function () {

            var resposta = xhr.responseText;
            var resp = JSON.parse(resposta);
            console.log(resp)
            if (resp == "Usuário ou senha inválidos!") {
                msgErro.style.display = "inline-block";
                ClInput.style.border = "1px solid #f74040";
                ClSenha.style.border = "1px solid #f74040";

            } else {  /// caso estiver tudo certo...
                msgErro.style.display = "none";
                ClInput.style.border = "1px solid #000000";
                ClSenha.style.border = "1px solid #f74040";
                const token = { "token": "test123%yNgAkZlOhQd14s@a!@#(NDFO&##$gyr328%#$hF#%@&%#b2442618$#(*" };
                setToken(token);
                console.log(token);
                setUserName(inUser);
                setPassword(inUser);
            }
        });
        xhr.send("InLogin=" + inUser + "&InSenha=" + inPass)
    }
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};
export default Login;