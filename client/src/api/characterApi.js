import axios from 'axios';
import cors from 'cors';

const API_URL = 'https://project-ap-j937.onrender.com/api/characters';

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