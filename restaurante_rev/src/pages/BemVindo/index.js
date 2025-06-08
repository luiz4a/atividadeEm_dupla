//C:\Users\aluno.den\Downloads\atividadeEm_dupla\restaurante_rev\src\pages\BemVindo\index.js

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Importa o hook
import './style.css';
import logo from '../../assets/images/rev21.png'; // Ajuste o caminho conforme necessário


function BemVindo() {
    const navigate = useNavigate(); 
    const [menuOpen, setMenuOpen] = useState(false);

    // Fecha o menu ao navegar
    const handleNavigate = (path) => {
      setMenuOpen(false);
      navigate(path);
    };

  return (
    <div className="background">
      <div className="overlay">
        <header className="header">
          <img src={logo} alt="Logo Restaurante" className="logo" />
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
            &#9776;
          </button>
          <nav>
            <ul className={`nav${menuOpen ? ' open' : ''}`}>
              <li onClick={() => handleNavigate('/usuarios')}>Produtos</li>
              <li>Restaurantes</li>
              <li onClick={() => handleNavigate('/delivery')}>Delivery</li>
              <li onClick={() => handleNavigate('/contato')}>Contato</li>
            </ul>
          </nav>
        </header>

        <main className="main">
          <h1>Bem-vindo ao Nosso Restaurante</h1>
          <p>Encontre seu momento especial com a gente.</p>
          <button onClick={() => navigate('/cadastro')} className="button-cadastro">
            Cadastrar Novo Prato
          </button>
        </main>
      </div>
    </div>
  );
}

export default BemVindo;