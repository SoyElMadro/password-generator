const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const allowCors = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
};

app.use(allowCors);

app.post('/api/generate-password', (req, res) => {
  const { length, includeUppercase, includeNumbers, includeSymbols } = req.body;

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = uppercaseChars.toLowerCase();
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()-_+=<>?';

  let charset = lowercaseChars;
  if (includeUppercase) charset += uppercaseChars;
  if (includeNumbers) charset += numberChars;
  if (includeSymbols) charset += symbolChars;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  res.json({ password: password });
});

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT} (PORT: ${PORT})`);
});
