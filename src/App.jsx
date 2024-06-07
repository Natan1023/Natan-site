import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${number}`);
        const data = await response.json();
        setCharacter(data);
        setEpisodes(data.episode);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        setError('Erro ao buscar dados');
        setSearchValue('');
      }
    }
    fetchData();
  }, [number]);

  const handlePrevious = () => {
    if (number > 1) {
      const newNumber = number - 1;
      setNumber(newNumber);
    }
  };

  const handleNext = () => {
    const newNumber = number + 1;
    setNumber(newNumber);
  };

  const handleSearch = () => {
    const searchNumber = parseInt(searchValue);
    if (searchValue.trim() !== '') {
      if (searchNumber > 826) {
        setError('Erro, não há mais personagens');
      } else {
        setNumber(searchNumber);
        setError(null);
        setSearchValue('');
      }
    }
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="inputGroup">
          <input
            type="text"
            required=""
            autoComplete="off"
            value={searchValue}
            onChange={handleInputChange}
          />
          <label htmlFor="name">Nome</label>
          <button onClick={handleSearch}>Pesquisar</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="center-panel">
        <h1>Rick and Morty</h1>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="character-info">
            <img src={character.image} alt={character.name} />
            <div className="character-details">
              <p>Nome: {character.name}</p>
              <p>Espécie: {character.species}</p>
              <p>Gênero: {character.gender}</p>
              <p>Origem: {character.origin.name}</p>
              <p>Localidade: {character.location.name}</p>
              <p>Criado: {character.created}</p>
            </div>
          </div>
        )}
        <div className="navigation-buttons">
          <button onClick={handlePrevious} disabled={number <= 1}>Anterior</button>
          <button onClick={handleNext}>Próximo</button>
        </div>
      </div>
      <div className="right-panel">
        <p>Episódios:</p>
        <ul> 
          {episodes.map((episode, index) => (
            <li key={index}>Episódio {episode.split('/').pop()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;


