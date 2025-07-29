import axios from 'axios';

const API_URL = 'http://localhost:5000/api/characters';

export const getCharacters = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCharacter = async (character) => {
  const response = await axios.post(API_URL, character);
  return response.data;
};