import React, { useState } from 'react';
import imgHome from "../Home/398-removebg-preview.png";
import '../Home/home.css'

function Home() {
  return (
    <div className="main-container">

      <div className="cardNova">
        <section className="ClContainer ClCenter ClContent" >
          <img className="imgHome" src={imgHome} />


          <div className="ClDiv1">

            <h1 className="ClTitleHome">Conheça Um Pouco Sobre A StockPile</h1>

            <p className="ClP2">
              <h1>Objetivos</h1>
              <br />
              <h5>&bull; Agilidade</h5>
              <h5>&bull; Organização</h5>
              <h5>&bull; Segurança</h5>
              <h5>&bull; Praticidade</h5>

              {/* <h2></h2> */}
            </p>

            <p className="ClP1">
              <h1>Funcionalidades</h1>
              <br />
              <h5>&bull; Gerenciamento de Estoque</h5>
              <p></p>
              <h5>&bull; Histórico de Atividades</h5>
              <p></p>
              <h5>&bull; pedidos Automáticos</h5>
              <p></p>
              <h5>&bull; Saídas de Produtos</h5>
            </p>



            <p className="ClP4">
              <h1>Proposta</h1>
              <h5>Sistema de controle de estoque com foco nos pequenos negócios.</h5>
              <h5>Com a finalidade de automatizar a logística para o reabastecimento do estoque  do usuário e fornecer mais informações ao cliente sobre o andamento do seu negócio.</h5>
            </p>

          </div>

        </section>
      </div>
    </div>


  )
}

export default Home;