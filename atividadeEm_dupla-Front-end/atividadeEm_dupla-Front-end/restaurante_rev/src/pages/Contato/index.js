import React from "react";
import './style.css';
import logo from '../../assets/images/rev21.png';
import { useNavigate } from 'react-router-dom';

function Contato() {
  const navigate = useNavigate();
  return (
    <div className="background">
      <div className="overlay">
        <header className="header">
          <img src={logo} alt="Logo Restaurante" className="logo" style={{cursor: 'pointer'}} onClick={() => navigate('/')} />
          <nav>
            <ul className="nav">
              <li onClick={() => navigate('/usuarios')}>Produtos</li>
              <li>Restaurantes</li>
              <li onClick={() => navigate('/delivery')}>Delivery</li>
              <li style={{color: '#FFD700', fontWeight: 'bold'}}>Contato</li>
            </ul>
          </nav>
        </header>
        <main className="main-contato">
          <h1>Contato</h1>
          <p>Entre em contato conosco para reservas, dúvidas ou sugestões.</p>
          <div className="contato-lista">
            <div className="contato-item">
              <span className="contato-tipo">WhatsApp:</span>
              <a href="https://wa.me/5599999999999" target="_blank" rel="noopener noreferrer" className="contato-link">(99) 99999-9999</a>
            </div>
            <div className="contato-item">
              <span className="contato-tipo">E-mail:</span>
              <a href="mailto:contato@restaurante.com" className="contato-link">contato@restaurante.com</a>
            </div>
            {/* Adicione mais contatos abaixo conforme necessário */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Contato;

