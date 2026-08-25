const form = document.getElementById('hash-form');
const message = document.getElementById('message');
const resultCard = document.getElementById('result-card');
const resultInput = document.getElementById('result-input');
const resultN = document.getElementById('result-n');
const resultHash = document.getElementById('result-hash');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = '';
  resultCard.hidden = true;

  const formData = new FormData(form);
  const text = String(formData.get('text') ?? '');
  const n = String(formData.get('n') ?? '0');

  try {
    const response = await fetch(`/grind?text=${encodeURIComponent(text)}&n=${encodeURIComponent(n)}`);
    const data = await response.json();

    if (!response.ok) {
      message.textContent = data.error || 'Request failed.';
      return;
    }

    resultInput.textContent = data.input;
    resultN.textContent = data.n;
    resultHash.textContent = data.hash;
    resultCard.hidden = false;
  } catch (error) {
    message.textContent = 'Could not reach server. Please try again.';
  }
});
