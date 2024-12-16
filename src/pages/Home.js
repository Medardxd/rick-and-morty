import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const [info, setInfo] = useState({}); 
  const [currentPage, setCurrentPage] = useState('https://rickandmortyapi.com/api/character');

  useEffect(() => {
    axios.get(currentPage)
      .then(response => {
        setCharacters(response.data.results);
        setInfo(response.data.info);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [currentPage]);

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Species</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(character => (
            <tr key={character.id} onClick={() => navigate(`/profile/${character.id}`)} style={{ cursor: 'pointer' }}>
                <td>
                    <img src={character.image} alt={character.name} className="avatar-img" />
                </td>
                <td>{character.name}</td>
                <td>{character.species}</td>
                <td>{character.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setCurrentPage(info.prev)} disabled={!info.prev}>Previous</button>
        <button onClick={() => setCurrentPage(info.next)} disabled={!info.next}>Next</button>
      </div>
    </div>
  );
}

export default Home;