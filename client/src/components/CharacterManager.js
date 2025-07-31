import React, { useEffect, useState } from 'react';
import { getCharacters, updateCharacter, deleteCharacter } from '../api/characterApi';

function CharacterManager() {
  const [characters, setCharacters] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const data = await getCharacters();
    setCharacters(data);
  };

  const handleEditClick = (character) => {
    setEditId(character._id);
    setEditData({ ...character });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    await updateCharacter(id, editData);
    setEditId(null);
    setEditData({});
    fetchCharacters();
  };

  const handleDelete = async (id) => {
    await deleteCharacter(id);
    fetchCharacters();
  };

  return (
    <div>
      <h2>Saved Characters</h2>
      <ul>
        {characters.map((character) => (
          <li key={character._id}>
            {editId === character._id ? (
              <>
                <input
                  name="name"
                  value={editData.name || ''}
                  onChange={handleEditChange}
                  placeholder="Name"
                />
                {/* Add more fields as needed */}
                <button onClick={() => handleEditSave(character._id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span><b>{character.name}</b> (Lv {character.level})</span>
                <button onClick={() => handleEditClick(character)}>Edit</button>
                <button onClick={() => handleDelete(character._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterManager;