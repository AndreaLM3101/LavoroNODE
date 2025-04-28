// Carica variabili ambiente
require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const pgp = require('pg-promise')();
const bcrypt = require('bcryptjs');

// Connessione a Postgres (i tuoi dati!)
const db = pgp('postgres://postgres:32460@localhost:5432/EsercizioJWT');

// Middleware globali
app.use(express.json());
app.use(passport.initialize());

// Configurazione di Passport con JWT
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [jwt_payload.id]);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

// Route: REGISTER
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.none('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    res.json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: LOGIN
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.one('SELECT * FROM users WHERE username = $1', [username]);
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });

    await db.none('UPDATE users SET token = $1 WHERE id = $2', [token, user.id]);

    res.json({ message: 'Logged in', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: PROTECTED
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'You accessed a protected route!', user: req.user });
});

// Avvia server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));