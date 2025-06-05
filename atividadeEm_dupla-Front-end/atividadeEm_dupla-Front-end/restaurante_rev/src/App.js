import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaCadastro from './pages/Cadastro';
import PaginaCardapio from './pages/Cardapio';
import PaginaBemVindo from './pages/BemVindo';  
import PaginaContato from './pages/Contato';
import PaginaDelivery from './pages/Delivery';
import './App.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<PaginaBemVindo />} />  
        <Route path="/cadastro" element={<PaginaCadastro />} /> 
        <Route path="/usuarios" element={<PaginaCardapio />} />
        <Route path="/contato" element={<PaginaContato />} />
        <Route path="/delivery" element={<PaginaDelivery />} />
      </Routes>
  );
}

export default App;