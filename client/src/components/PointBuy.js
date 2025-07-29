import React from 'react';

// D&D 5e point buy cost table
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

export default function PointBuy({ stats, onChange, maxPoints = 18 }) {
  const totalPoints = Object.values(stats).reduce(
    (sum, val) => sum + pointBuyCost(Number(val)), 0
  );
  const overLimit = totalPoints > maxPoints;

  const handleStatChange = (e) => {
    const { name, value } = e.target;
    let newVal = Number(value);
    if (newVal < 8) newVal = 8;
    if (newVal > 15) newVal = 15;

    const previewStats = { ...stats, [name]: newVal };
    const previewTotal = Object.values(previewStats).reduce(
      (sum, val) => sum + pointBuyCost(Number(val)), 0
    );

    // Only allow if not over limit or if lowering stat
    if (previewTotal <= maxPoints || newVal < stats[name]) {
      onChange({ ...stats, [name]: newVal });
    }
  };

  return (
    <div>
      <div>
        <strong>Point Buy: {totalPoints}/{maxPoints}</strong>
        {overLimit && (
          <span style={{ color: 'red', marginLeft: '1rem' }}>
            Over the {maxPoints}-point limit!
          </span>
        )}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem 0' }}>
        {Object.keys(stats).map((stat) => (
          <input
            key={stat}
            name={stat}
            type="number"
            min={8}
            max={15}
            value={stats[stat]}
            onChange={handleStatChange}
            placeholder={stat.toUpperCase()}
          />
        ))}
      </div>
    </div>
  );
}