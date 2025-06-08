// src/pages/Cardapio/index.js
import React, { useEffect, useState } from "react";
import "./style.css";
import logo from '../../assets/images/rev21.png';
import { useNavigate } from 'react-router-dom';

function ListaPratos() {
  const [pratos, setPratos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pratosSalvos = JSON.parse(localStorage.getItem('pratos')) || [];
    setPratos(pratosSalvos);
  }, []);

  // Função para deletar prato
  const handleDelete = (idx) => {
    if (window.confirm('Tem certeza que deseja deletar este prato?')) {
      const novosPratos = pratos.filter((_, i) => i !== idx);
      setPratos(novosPratos);
      localStorage.setItem('pratos', JSON.stringify(novosPratos));
    }
  };

  // Função para alterar valor do prato
  const handleChangePreco = (idx, novoPreco) => {
    const novosPratos = pratos.map((prato, i) =>
      i === idx ? { ...prato, preco: novoPreco } : prato
    );
    setPratos(novosPratos);
    localStorage.setItem('pratos', JSON.stringify(novosPratos));
  };

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
              <li onClick={() => navigate('/contato')}>Contato</li>
            </ul>
          </nav>
        </header>
        <main className="main-cardapio">
          <h1>Cardápio do Restaurante</h1>
          <div className="lista-pratos">
            {pratos.length === 0 ? (
              <div style={{color: '#8B4513', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '2rem'}}>Nenhum prato cadastrado ainda.</div>
            ) : (
              pratos.map((prato, idx) => (
                <div className={`prato-card ${prato.disponibilidade === "Esgotado" ? "esgotado" : ""}`} key={idx}>
                  {prato.urlImagem && (
                    <img src={prato.urlImagem} alt={prato.nomePrato} className="prato-img" />
                  )}
                  <div className="prato-info">
                    <h2>{prato.nomePrato}</h2>
                    <p className="descricao">{prato.descricao}</p>
                    <div className="prato-meta">
                      <span className="categoria">{prato.categoria}</span>
                      <span className="preco">
                        R$ <input type="number" min="0" step="0.01" value={prato.preco} style={{width:'80px'}}
                          onChange={e => handleChangePreco(idx, parseFloat(e.target.value) || 0)} />
                      </span>
                    </div>
                    <span className={`disponibilidade ${prato.disponibilidade === "Esgotado" ? "esgotado" : "em-estoque"}`}>
                      {prato.disponibilidade}
                    </span>
                    <button onClick={() => handleDelete(idx)} style={{marginTop:'10px', background:'#dc3545', color:'#fff', border:'none', borderRadius:'8px', padding:'6px 16px', cursor:'pointer'}}>Deletar</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ListaPratos;