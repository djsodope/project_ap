import axios from 'axios';

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

export const updateCharacter = async (id, character) => {
  const response = await axios.put(`${API_URL}/${id}`, character, { headers: authHeader() });
  return response.data;
};

export const deleteCharacter = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  return response.data;
};