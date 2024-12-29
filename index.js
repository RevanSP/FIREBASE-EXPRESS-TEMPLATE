require('dotenv').config();
const express = require('express');
const { getFirebaseConfig } = require('./public/lib/firebase');

const app = express();
const port = 1503;
const storedPassword = process.env.PASSWORD;

app.use(express.static('public'));
app.use(express.json());

if (storedPassword) {
  console.log("SUCCESS: .env loaded.");
} else {
  console.log("FAILED: .env or PASSWORD missing.");
}

app.get('/firebase-config', (req, res) => {
  res.json(getFirebaseConfig());
});

app.listen(port, () => console.log(`Server running on port ${port}`));