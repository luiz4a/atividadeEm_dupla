import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './style.css';
import logo from '../../assets/images/rev21.png'; // Ajuste o caminho conforme necessário


function CadastroPrato() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomePrato: '',
    descricao: '',
    preco: '',
    categoria: '',
    disponibilidade: 'Em estoque',
    urlImagem: ''
  });

  const [previewImagem, setPreviewImagem] = useState('');
  const [imagemCarregando, setImagemCarregando] = useState(false);
  const [erroImagem, setErroImagem] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState(false);

  const categorias = [
    'Entrada',
    'Prato Principal', 
    'Sobremesa',
    'Bebida'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Atualiza preview da imagem quando URL muda
    if (name === 'urlImagem') {
      setErroImagem(false);
      if (value.trim()) {
        setImagemCarregando(true);
        setPreviewImagem(value.trim());
      } else {
        setPreviewImagem('');
        setImagemCarregando(false);
      }
    }
  };

  const handleImageLoad = () => {
    setImagemCarregando(false);
    setErroImagem(false);
  };

  const handleImageError = () => {
    setImagemCarregando(false);
    setErroImagem(true);
    setPreviewImagem('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validações
    if (!formData.nomePrato.trim()) {
      alert('Nome do prato é obrigatório!');
      return;
    }
    
    if (!formData.categoria) {
      alert('Selecione uma categoria!');
      return;
    }

    if (!formData.preco || parseFloat(formData.preco) <= 0) {
      alert('Informe um preço válido!');
      return;
    }

    // Salvar prato no localStorage
    const pratoData = {
      ...formData,
      preco: parseFloat(formData.preco)
    };
    const pratosSalvos = JSON.parse(localStorage.getItem('pratos')) || [];
    pratosSalvos.push(pratoData);
    localStorage.setItem('pratos', JSON.stringify(pratosSalvos));

    // Mensagem de sucesso e redirecionamento
    setMensagemSucesso(true);
    setTimeout(() => {
      setMensagemSucesso(false);
      navigate('/usuarios');
    }, 1500);
    
    // Limpa o formulário
    setFormData({
      nomePrato: '',
      descricao: '',
      preco: '',
      categoria: '',
      disponibilidade: 'Em estoque',
      urlImagem: ''
    });
    setPreviewImagem('');
    setErroImagem(false);
    setImagemCarregando(false);
  };

  return (
    <div className="background">
      <div className="overlay">
        <header className="header">
          <img 
            src={logo} 
            alt="Logo Restaurante" 
            className="logo" 
            style={{cursor: 'pointer'}}
            onClick={() => navigate('/')}
          />
          <nav>
            <ul className="nav">
              <li onClick={() => navigate('/usuarios')}>Produtos</li>
              <li>Restaurantes</li>
              <li onClick={() => navigate('/delivery')}>Delivery</li>
              <li onClick={() => navigate('/contato')}>Contato</li>
            </ul>
          </nav>
        </header>

        <main className="main-cadastro">
          <div className="cadastro-container prato-container">
            <h1>Cadastrar Novo Prato</h1>
            <p>Adicione um novo item ao cardápio do restaurante</p>
            
            <form onSubmit={handleSubmit} className="cadastro-form">
              {mensagemSucesso && (
                <div style={{
                  background: '#d4edda',
                  color: '#155724',
                  border: '1px solid #c3e6cb',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '18px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  boxShadow: '0 2px 8px #c3e6cb'
                }}>
                  Prato cadastrado com sucesso!
                </div>
              )}

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="nomePrato">Nome do Prato *</label>
                  <input
                    type="text"
                    id="nomePrato"
                    name="nomePrato"
                    value={formData.nomePrato}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Risotto de Camarão"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="preco">Preço (R$) *</label>
                  <input
                    type="number"
                    id="preco"
                    name="preco"
                    value={formData.preco}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="29.90"
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Descreva os ingredientes e características do prato..."
                />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="categoria">Categoria *</label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="disponibilidade">Disponibilidade</label>
                  <select
                    id="disponibilidade"
                    name="disponibilidade"
                    value={formData.disponibilidade}
                    onChange={handleChange}
                  >
                    <option value="Em estoque">Em estoque</option>
                    <option value="Esgotado">Esgotado</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="urlImagem">URL da Imagem</label>
                <input
                  type="url"
                  id="urlImagem"
                  name="urlImagem"
                  value={formData.urlImagem}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/imagem-do-prato.jpg"
                />
                {erroImagem && (
                  <small style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                    Erro ao carregar a imagem. Verifique se a URL está correta.
                  </small>
                )}
              </div>

              {/* Preview da imagem */}
              {(previewImagem || imagemCarregando) && (
                <div className="image-preview">
                  <label>Preview da Imagem:</label>
                  {imagemCarregando && (
                    <div style={{ 
                      padding: '20px', 
                      textAlign: 'center', 
                      color: '#666',
                      fontStyle: 'italic'
                    }}>
                      Carregando imagem...
                    </div>
                  )}
                  {previewImagem && (
                    <img 
                      src={previewImagem} 
                      alt="Preview do prato"
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid #ddd'
                      }}
                    />
                  )}
                </div>
              )}

              <div className="button-group">
                <button 
                  type="submit" 
                  className="button-cadastro1"
                >
                  Cadastrar Prato
                </button>
                
                <button 
                  type="button"
                  onClick={() => navigate('/')} 
                  className="button-voltar"
                >
                  Voltar ao Início
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CadastroPrato;