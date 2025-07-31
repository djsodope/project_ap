import axios from 'axios';
const cors = require('cors');

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

app.use(cors({
  origin: [
    'https://project-ap-tau.vercel.app', // old frontend
    // add your new frontend domain below
  ],
  credentials: true
}));

// You can add update/delete functions here as well if needed