const { getFirebaseConfig } = require('../public/lib/firebase');

const allowedOrigins = ['https://firebase-expressjs.vercel.app'];

const handler = (req, res) => {
  try {
    const origin = req.headers.origin || req.headers.referer;
    if (!origin || !allowedOrigins.some(o => origin.startsWith(o))) {
      return res.status(403).json({ error: 'Forbidden: Invalid origin' });
    }

    if (req.method === 'GET') {
      return res.json({ getFirebaseConfig: getFirebaseConfig() });
    }
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error in /api/firebase-config:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = handler;