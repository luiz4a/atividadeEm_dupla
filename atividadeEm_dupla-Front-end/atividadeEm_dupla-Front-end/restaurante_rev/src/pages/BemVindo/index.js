//C:\Users\aluno.den\Downloads\atividadeEm_dupla\restaurante_rev\src\pages\BemVindo\index.js

import React from "react";
import { useNavigate } from 'react-router-dom'; // Importa o hook
import './style.css';
import logo from '../../assets/images/rev21.png'; // Ajuste o caminho conforme necessário


function BemVindo() {
    const navigate = useNavigate(); 
  return (
    <div className="background">
      <div className="overlay">
        <header className="header">
          <img src={logo} alt="Logo Restaurante" className="logo" />
          <nav>
            <ul className="nav">
              <li onClick={() => navigate('/usuarios')}>Produtos</li>
              <li>Restaurantes</li>
              <li onClick={() => navigate('/delivery')}>Delivery</li>
              <li onClick={() => navigate('/contato')}>Contato</li>
            </ul>
          </nav>
        </header>

        <main className="main">
          <h1>Bem-vindo ao Nosso Restaurante</h1>
          <p>Encontre seu momento especial com a gente.</p>
          
          <button onClick={() => navigate('/cadastro')} className="button-cadastro">
            Cadastre-Se
          </button>
        </main>
      </div>
    </div>
  );
}

export default BemVindo;