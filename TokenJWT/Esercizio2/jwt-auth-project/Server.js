// Carica variabili ambiente
require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const pgp = require('pg-promise')();
const bcrypt = require('bcryptjs');

// Connessione a Postgres
const db = pgp('postgres://postgres:32460@localhost:5432/EsercizioJWT');

// Middleware globali
app.use(express.json());
app.use(passport.initialize());

// Configurazione Passport JWT
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

// Route: SIGNUP
app.post('/users/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.none('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    res.json({ msg: "Signup successful. Now you can log in." });
  } catch (err) {
    res.status(500).json({ error: "Signup failed." });
  }
});

// Route: LOGIN
app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password." });
    }

    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, process.env.SECRET);

    // Salva il token nel DB
    await db.none('UPDATE users SET token = $1 WHERE id = $2', [token, user.id]);

    res.json({ token, id: user.id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Login failed." });
  }
});

// Route protetta (opzionale)
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'You accessed a protected route!', user: req.user });
});

// Avvia server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
