import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Details = ({ character, onClose }) => {
  const [showEpisodes, setShowEpisodes] = useState(false);

  if (!character) {
    return <p>Select a character to see the details</p>;
  }

  // Age calculation
  const createdDate = new Date(character.created);
  const today = new Date();
  const age = today.getFullYear() - createdDate.getFullYear();
  const monthDiff = today.getMonth() - createdDate.getMonth();
  const dayDiff = today.getDate() - createdDate.getDate();

  // Adjust age if the birthday hasn't occurred yet this year
  const adjustedAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

  // Format created date
  const formattedCreatedDate = createdDate.toLocaleString();

  return (
    <div className="details" style={{ position: 'relative', padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        style={{ position: 'absolute', right: 0, top: 0 }}
      >
        <CloseIcon />
      </IconButton>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} width="150" height="150" />
      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Type:</strong> {character.type}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
      <p><strong>Origin:</strong> {character.origin.name}</p>
      <p><strong>Location:</strong> {character.location.name}</p>
      <p><strong>Total Played Episodes:</strong> {character.episode.length}</p>
      <Button variant="outlined" color="primary" onClick={() => setShowEpisodes(!showEpisodes)} style={{ marginBottom: '8px' }}>
        {showEpisodes ? 'Hide Episodes' : 'Click here to view played episodes'}
      </Button>
      {showEpisodes && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {character.episode.map((ep) => (
            <Box key={ep} sx={{ background: '#e0e0e0', padding: '4px 8px', borderRadius: '4px' }}>
              {`Episode ${ep.split('/').pop()}`}
            </Box>
          ))}
        </Box>
      )}
      <p><strong>Age:</strong> {adjustedAge} years</p>
      <p><strong>Created:</strong> {formattedCreatedDate}</p>
    </div>
  );
};

export default Details;
