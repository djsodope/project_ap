import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import CharacterSheet from './CharacterSheet';
import PointBuy from './components/PointBuy';
import { getCharacters, createCharacter } from './api/characterApi';
import axios from 'axios';

const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
const STAT_KEYS = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

const CLASS_OPTIONS = [
  { value: '', label: 'Select Class' },
  { value: 'warrior', label: 'Warrior' },
  { value: 'mage', label: 'Mage' },
  { value: 'rogue', label: 'Rogue' },
  { value: 'cleric', label: 'Cleric' },
  // Add more classes as needed
];

const ROLE_OPTIONS = [
  { value: '', label: 'Select Role' },
  { value: 'dps', label: 'DPS' },
  { value: 'tank', label: 'Tank' },
  { value: 'support', label: 'Support' },
];

function Auth({ onAuth }) {
  const [mode, setMode] = useState('login'); // or 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const res = await axios.post(`http://localhost:5000${url}`, { username, password });
      if (mode === 'login') {
        localStorage.setItem('token', res.data.token);
        onAuth();
      } else {
        setMode('login');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
        {mode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
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
  const [statMethod, setStatMethod] = useState('pointbuy'); // 'pointbuy' or 'standard'
  const sheetRef = useRef();

  useEffect(() => {
    if (isAuth) fetchCharacters();
  }, [isAuth]);

  const fetchCharacters = async () => {
    const data = await getCharacters();
    setCharacters(data);
  };

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

  const submitCharacter = async () => {
    // Remove _id: Date.now() -- let MongoDB handle IDs
    const newChar = { ...form };
    await createCharacter(newChar);
    fetchCharacters(); // Refresh list from backend

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

  // Move pointBuyCost here so you can use it for the Create button
  const pointBuyCost = (score) => {
    if (!score || isNaN(score)) return 0;
    if (score < 8) return 0;
    if (score === 8) return 0;
    if (score === 9) return 1;
    if (score === 10) return 2;
    if (score === 11) return 3;
    if (score === 12) return 4;
    if (score === 13) return 5;
    if (score === 14) return 7;
    if (score === 15) return 9;
    return Infinity;
  };

  // Handler for switching stat method
  const handleStatMethodChange = (e) => {
    const method = e.target.value;
    setStatMethod(method);
    if (method === 'standard') {
      setForm(prev => ({
        ...prev,
        stats: STAT_KEYS.reduce((acc, key, i) => ({ ...acc, [key]: STANDARD_ARRAY[i] }), {})
      }));
    } else if (method === 'pointbuy') {
      setForm(prev => ({
        ...prev,
        stats: STAT_KEYS.reduce((acc, key) => ({ ...acc, [key]: 8 }), {})
      }));
    } else if (method === 'rolling') {
      setForm(prev => ({
        ...prev,
        stats: rollStats()
      }));
    }
  };

  function rollStat() {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => b - a); // Descending
    return rolls[0] + rolls[1] + rolls[2]; // Sum top 3
  }

  function rollStats() {
    return STAT_KEYS.reduce((acc, key) => ({ ...acc, [key]: rollStat() }), {});
  }

  if (!isAuth) {
    return <Auth onAuth={() => setIsAuth(true)} />;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Primus Character Creator</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={{ minWidth: 120, padding: '0.25rem', marginRight: '0.5rem' }}
        >
          {ROLE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <input name="archetype" value={form.archetype} onChange={handleChange} placeholder="Archetype" />
        <input name="level" type="number" value={form.level} onChange={handleChange} placeholder="Level" />

        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="radio"
              value="pointbuy"
              checked={statMethod === 'pointbuy'}
              onChange={handleStatMethodChange}
            />
            Point Buy
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              value="standard"
              checked={statMethod === 'standard'}
              onChange={handleStatMethodChange}
            />
            Standard Array
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              value="rolling"
              checked={statMethod === 'rolling'}
              onChange={handleStatMethodChange}
            />
            Roll
          </label>
        </div>

        {statMethod === 'pointbuy' ? (
          <PointBuy
            stats={form.stats}
            onChange={(newStats) => setForm(prev => ({ ...prev, stats: newStats }))}
            maxPoints={27}
          />
        ) : statMethod === 'standard' ? (
          <div style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem 0' }}>
            {STAT_KEYS.map((stat, i) => (
              <div key={stat}>
                <label>{stat.toUpperCase()}</label>
                <input
                  type="number"
                  value={form.stats[stat]}
                  readOnly
                  style={{ width: 40, textAlign: 'center', background: '#eee' }}
                />
              </div>
            ))}
            <div style={{ marginLeft: '1rem', fontWeight: 'bold' }}>
              Standard Array: {STANDARD_ARRAY.join(', ')}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem 0', alignItems: 'center' }}>
            {STAT_KEYS.map((stat) => (
              <div key={stat}>
                <label>{stat.toUpperCase()}</label>
                <input
                  type="number"
                  value={form.stats[stat]}
                  readOnly
                  style={{ width: 40, textAlign: 'center', background: '#eee' }}
                />
              </div>
            ))}
            <button
              type="button"
              style={{ marginLeft: '1rem' }}
              onClick={() => setForm(prev => ({ ...prev, stats: rollStats() }))}
            >
              Re-roll
            </button>
          </div>
        )}

        <button
          onClick={submitCharacter}
          disabled={
            statMethod === 'pointbuy'
              ? Object.values(form.stats).reduce((sum, val) => sum + pointBuyCost(Number(val)), 0) > 27
              : false
          }
        >
          Create
        </button>
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
