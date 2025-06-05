import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../BemVindo/style.css';
import logo from '../../assets/images/rev21.png';

function calcularFrete(cep) {
  // Exemplo simples: frete fictício baseado nos 3 primeiros dígitos do CEP
  if (!cep || cep.length < 8) return null;
  const prefixo = parseInt(cep.substring(0, 3));
  if (prefixo >= 100 && prefixo < 200) return 10.0;
  if (prefixo >= 200 && prefixo < 400) return 15.0;
  if (prefixo >= 400 && prefixo < 600) return 20.0;
  return 25.0;
}

const Delivery = () => {
  const navigate = useNavigate();
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(null);
  const [erro, setErro] = useState("");

  const handleCalcular = (e) => {
    e.preventDefault();
    if (!/^\d{8}$/.test(cep)) {
      setErro("Digite um CEP válido (apenas números, 8 dígitos)");
      setFrete(null);
      return;
    }
    setErro("");
    setFrete(calcularFrete(cep));
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
              <li style={{color: '#FFD700', fontWeight: 'bold'}}>Delivery</li>
              <li onClick={() => navigate('/contato')}>Contato</li>
            </ul>
          </nav>
        </header>
        <main className="main">
          <h1>Calcule o Frete para seu Endereço</h1>
          <form onSubmit={handleCalcular} style={{marginTop: 32, marginBottom: 24}}>
            <input
              type="text"
              maxLength={8}
              placeholder="Digite seu CEP (somente números)"
              value={cep}
              onChange={e => setCep(e.target.value.replace(/\D/g, ""))}
              style={{padding: 12, borderRadius: 8, border: '1.5px solid #D2691E', fontSize: 18, width: 220, marginRight: 12}}
            />
            <button type="submit" className="button-cadastro">Calcular Frete</button>
          </form>
          {erro && <div style={{color: '#dc3545', fontWeight: 'bold', marginBottom: 16}}>{erro}</div>}
          {frete !== null && !erro && (
            <div style={{color: '#FFD700', fontWeight: 'bold', fontSize: 22, marginTop: 12}}>
              Frete para o CEP {cep}: R$ {frete.toFixed(2)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Delivery;
