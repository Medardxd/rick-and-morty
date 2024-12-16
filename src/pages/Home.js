import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const [info, setInfo] = useState({}); 
  const [currentPage, setCurrentPage] = useState(
    () => parseInt(localStorage.getItem('currentPage')) || 1
  );
  const [searchQuery, setSearchQuery] = useState("");
  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage); // Save to local storage
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
      .then((response) => {
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
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
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
          {filteredCharacters.map((character) => (
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
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={!info?.prev}>Previous</button>
        <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={!info?.next}>Next</button>
      </div>
    </div>
  );
}

export default Home;