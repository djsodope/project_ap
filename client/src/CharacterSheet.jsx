// CharacterSheet.jsx
import React, { forwardRef } from 'react';

const CharacterSheet = forwardRef(({ character = {} }, ref) => {
  const {
    name = '',
    level = 1,
    role = '',
    archetype = '',
    background = '',
    race = '',
    ap = 3,
    gp = 0,
    stats = {},
    skills = [],
    reaction = '',
    resource = {},
    passives = [],
    gear = {}
  } = character;

  const { str = '', dex = '', con = '', int: intel = '', wis = '', cha = '' } = stats;
  const { weapon = '', armor = '', accessory = '', items = [] } = gear;

  return (
    <div ref={ref} style={{ padding: '2rem', fontFamily: 'serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>{name || 'Unnamed'} <span>(Lv {level})</span></h1>

      <hr />

      <section>
        <h2>🧍 Core Info</h2>
        <p><strong>Role:</strong> {role || '—'}</p>
        <p><strong>Archetype:</strong> {archetype || '—'}</p>
        <p><strong>Race:</strong> {race || '—'}</p>
        <p><strong>Background:</strong> {background || '—'}</p>
        <p><strong>Resource Mechanic:</strong> {resource.name || '—'} (Max: {resource.max || 2})</p>
      </section>

      <hr />

      <section>
        <h2>📊 Stats</h2>
        <table>
          <thead>
            <tr><th>Stat</th><th>Value</th><th>Modifier</th></tr>
          </thead>
          <tbody>
            {[
              ['STR', str],
              ['DEX', dex],
              ['CON', con],
              ['INT', intel],
              ['WIS', wis],
              ['CHA', cha]
            ].map(([label, val]) => (
              <tr key={label}>
                <td>{label}</td>
                <td>{val || '—'}</td>
                <td>{val ? Math.floor((val - 10) / 2) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <hr />

      <section>
        <h2>🔋 AP & GP</h2>
        <p><strong>Action Points (AP):</strong> {ap} / <strong>10</strong></p>
        <p style={{ fontSize: '0.9rem', marginTop: '-0.5rem' }}>Players start with <strong>3 AP</strong> at Level 1</p>

        <p><strong>Gradient Points (GP):</strong> {gp} / <strong>3</strong></p>
        <p style={{ fontSize: '0.9rem', marginTop: '-0.5rem' }}>Max teamwide GP pool is <strong>3</strong> (shared resource)</p>
      </section>

      <hr />

      <section>
        <h2>🎯 Reaction</h2>
        <p>{reaction || '—'}</p>
      </section>

      <hr />

      <section>
        <h2>💥 Tier 1 Skills</h2>
        {skills.length ? (
          <ul>
            {skills.map((s, i) => (
              <li key={i}><strong>{s.name}</strong> ({s.cost} AP): {s.desc}</li>
            ))}
          </ul>
        ) : (
          <p>—</p>
        )}
      </section>

      <hr />

      <section>
        <h2>🧠 Resource System</h2>
        <p><strong>Name:</strong> {resource.name || '—'}</p>
        <p><strong>Max:</strong> {resource.max || 2}</p>
        <p><strong>Gain:</strong> {resource.gain || '—'}</p>
        <p><strong>Spend:</strong> {resource.spend || '—'}</p>
      </section>

      <hr />

      <section>
        <h2>📌 Passives</h2>
        <ul>
          {passives.length ? passives.map((p, i) => <li key={i}>{p}</li>) : <li>—</li>}
        </ul>
      </section>

      <hr />

      <section>
        <h2>🎒 Gear</h2>
        <p><strong>Weapon:</strong> {weapon || '—'}</p>
        <p><strong>Armor:</strong> {armor || '—'}</p>
        <p><strong>Accessory:</strong> {accessory || '—'}</p>
        <p><strong>Items:</strong> {items.length ? items.join(', ') : '—'}</p>
      </section>
    </div>
  );
});

export default CharacterSheet;
