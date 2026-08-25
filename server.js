const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = Number.parseInt(process.env.PORT, 10) || 80;
const HOST = '0.0.0.0';

app.use(express.static('public'));


/**
 * Hashes a string n times using SHA-256.
 */
function hashNTimes(input, n) {
  let result = input;
  for (let i = 0; i < n; i += 1) {
    result = crypto.createHash('sha256').update(result).digest('hex');
  }
  return result;
}

// GET /grind?text=hello&n=5
app.get('/grind', (req, res) => {
  const text = req.query.text ?? '';
  const n = Number.parseInt(req.query.n, 10);

  if (!Number.isInteger(n) || n < 0) {
    return res.status(400).json({
      error: 'Query parameter "n" must be a non-negative integer.',
    });
  }

  const hash = hashNTimes(text, n);

  return res.json({
    input: text,
    n,
    hash,
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Hash Grinder running on http://${HOST}:${PORT}`);
});
