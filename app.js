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

if (typeof document !== 'undefined') {
  const form = document.querySelector('#load-form');
  const message = document.querySelector('#message');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      const load = calculateLoad(form.duration.value, form.rpe.value);
      message.className = 'result';
      message.textContent = `Session training load: ${load} AU`;
    } catch (error) {
      message.className = 'error';
      message.textContent = error.message;
    }
  });
}
