import React, { useEffect, useState } from 'react';
import { getCharacters } from '../api/characterApi';

function CharacterManager() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const data = await getCharacters();
    setCharacters(data);
  };

  // ...rest of your component...
}