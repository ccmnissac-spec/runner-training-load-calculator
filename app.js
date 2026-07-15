function calculateLoad(duration, rpe) {
  const minutes = Number(duration);
  const effort = Number(rpe);

  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 600) {
    throw new Error('Duration must be a whole number from 1 to 600 minutes.');
  }
  if (!Number.isInteger(effort) || effort < 1 || effort > 10) {
    throw new Error('RPE must be a whole number from 1 to 10.');
  }
  return minutes * effort;
}

if (typeof module !== 'undefined') module.exports = { calculateLoad };
