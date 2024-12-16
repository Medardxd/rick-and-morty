import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => {
        setCharacter(response.data);
      })
      .catch(error => {
        console.error('Error fetching character data:', error);
      });
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>{character.name}</h1>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
      <p><strong>Location:</strong> {character.location.name}</p>
      <img src={character.image} alt={character.name} style={{ width: '200px' }} />
      <br /><br />
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default Profile;