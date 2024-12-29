require('dotenv').config();
const express = require('express');
const { getFirebaseConfig } = require('./public/lib/firebase');

const app = express();
const port = 1503;

app.use(express.static('public'));
app.use(express.json());

app.get('/firebase-config', (req, res) => {
  res.json(getFirebaseConfig());
});

app.listen(port, () => console.log(`Server running on port ${port}`));