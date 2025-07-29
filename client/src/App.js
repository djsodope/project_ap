import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import CharacterSheet from './CharacterSheet';

function App() {
  const [form, setForm] = useState({
    name: '',
    level: 1,
    role: '',
    archetype: '',
    background: '',
    race: '',
    ap: 3,
    gp: 0,
    stats: {
      str: '', dex: '', con: '', int: '', wis: '', cha: ''
    },
    skills: [],
    reaction: '',
    resource: {
      name: '',
      max: 4,
      gain: '',
      spend: ''
    },
    passives: [],
    gear: {
      weapon: '',
      armor: '',
      accessory: '',
      items: []
    }
  });

  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const sheetRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if it's a stat field
    if (['str', 'dex', 'con', 'int', 'wis', 'cha'].includes(name)) {
      setForm(prev => ({
        ...prev,
        stats: { ...prev.stats, [name]: value }
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submitCharacter = () => {
    const newChar = { ...form, _id: Date.now() };
    setCharacters(prev => [...prev, newChar]);

    // Reset form
    setForm({
      name: '',
      level: 1,
      role: '',
      archetype: '',
      background: '',
      race: '',
      ap: 3,
      gp: 0,
      stats: {
        str: '', dex: '', con: '', int: '', wis: '', cha: ''
      },
      skills: [],
      reaction: '',
      resource: {
        name: '',
        max: 2,
        gain: '',
        spend: ''
      },
      passives: [],
      gear: {
        weapon: '',
        armor: '',
        accessory: '',
        items: []
      }
    });
  };

  const handlePrint = useReactToPrint({
    content: () => sheetRef.current,
    documentTitle: selectedCharacter?.name || 'CharacterSheet',
    removeAfterPrint: true,
  });

  const handleExport = (char) => {
    setSelectedCharacter(char);
    setTimeout(() => {
      if (sheetRef.current) handlePrint();
    }, 100);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Primus Character Creator</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="role" value={form.role} onChange={handleChange} placeholder="Role" />
        <input name="archetype" value={form.archetype} onChange={handleChange} placeholder="Archetype" />
        <input name="level" type="number" value={form.level} onChange={handleChange} placeholder="Level" />

        {/* Optional: stat inputs */}
        <input name="str" value={form.stats.str} onChange={handleChange} placeholder="STR" />
        <input name="dex" value={form.stats.dex} onChange={handleChange} placeholder="DEX" />
        <input name="con" value={form.stats.con} onChange={handleChange} placeholder="CON" />
        <input name="int" value={form.stats.int} onChange={handleChange} placeholder="INT" />
        <input name="wis" value={form.stats.wis} onChange={handleChange} placeholder="WIS" />
        <input name="cha" value={form.stats.cha} onChange={handleChange} placeholder="CHA" />

        <button onClick={submitCharacter}>Create</button>
      </div>

      <h3>Saved Characters</h3>
      {characters.map((char) => (
        <div key={char._id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
          <strong>{char.name}</strong> (Lv {char.level})
          <p><strong>Role:</strong> {char.role}</p>
          <p><strong>Archetype:</strong> {char.archetype}</p>
          <button onClick={() => handleExport(char)}>Export PDF</button>
        </div>
      ))}

      <div style={{ display: 'none' }}>
        {selectedCharacter && (
          <CharacterSheet ref={sheetRef} character={selectedCharacter} />
        )}
      </div>
    </div>
  );
}

export default App;
