import axios from 'axios';

const API_URL = 'http://localhost:5000/api/characters';

const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getCharacters = async () => {
  const response = await axios.get(API_URL, { headers: authHeader() });
  return response.data;
};

export const createCharacter = async (character) => {
  const response = await axios.post(API_URL, character, { headers: authHeader() });
  return response.data;
};

// You can add update/delete functions here as well if needed