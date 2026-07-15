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
  const messageValue = document.querySelector('#message-value');
  const messageDetail = document.querySelector('#message-detail');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      const load = calculateLoad(form.duration.value, form.rpe.value);
      message.dataset.state = 'result';
      message.setAttribute('role', 'status');
      messageValue.textContent = load.toLocaleString('en-US');
      messageDetail.textContent = 'Duration × session RPE. Compare this with the same runner’s recent sessions.';
    } catch (error) {
      message.dataset.state = 'error';
      message.setAttribute('role', 'alert');
      messageValue.textContent = '—';
      messageDetail.textContent = error.message;
    }
  });
}
