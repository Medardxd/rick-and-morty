import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => {
        setCharacters(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Species</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(character => (
            <tr key={character.id} onClick={() => navigate(`/profile/${character.id}`)} style={{ cursor: 'pointer' }}>
              <td>{character.name}</td>
              <td>{character.status}</td>
              <td>{character.species}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;