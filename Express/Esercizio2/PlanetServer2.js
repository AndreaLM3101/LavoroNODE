require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const Joi = require('joi');
const pgPromise = require('pg-promise');

const db = pgPromise()("postgres://postgres:32460@localhost:5432/postgres")

console.log(db)

const app = express();

let planets = [
  { id: 1, name: 'Earth' },
  { id: 2, name: 'Mars' }
];

app.use(express.json());
app.use(morgan('dev'));

const planetSchema = Joi.object({ //Validazione oggetti
  name: Joi.string().min(2).required() //Ho dovuto cercare come usare joi: Serve a validare dati rivevuti (Stringa)
});

app.get('/api/planets', (req, res) => { //Restituisce tutti i pianeti con status 200 (validi)
  res.status(200).json(planets);
});

app.get('/api/planets/:id', (req, res) => { //Restituisce il pianeta specifico
  const id = parseInt(req.params.id); //parseInt Converte una stringa in numero
  const planet = planets.find(p => p.id === id);
  if (!planet) return res.status(404).json({ msg: 'Pianeta non trovato' });
  res.status(200).json(planet);
});

app.post('/api/planets', (req, res) => { //Funzione per creare
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const newPlanet = { //Crea un nuovo pianeta con ID successivo
    id: planets.length ? planets[planets.length - 1].id + 1 : 1, //(Cercato il metodo per aggiungere ID di 1)
    name: req.body.name
  };

  planets.push(newPlanet);
  res.status(201).json({ msg: 'Pianeta Aggiunto' });
});

app.put('/api/planets/:id', (req, res) => { // Funzione per aggiornare
  const id = parseInt(req.params.id); //parseInt Converte una stringa in numero
  const planet = planets.find(p => p.id === id);
  if (!planet) return res.status(404).json({ msg: 'Pianeta non trovato' });

  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  planet.name = req.body.name;
  res.status(200).json({ msg: 'Pianeta Aggiornato' });
});

app.delete('/api/planets/:id', (req, res) => { //Funzione Eliminazione
  const id = parseInt(req.params.id); //parseInt Converte una stringa in numero
  const index = planets.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ msg: 'Pianeta non trovato' });

  planets.splice(index, 1); //Metodo degli array per rimuovere (non ricordavo)
  res.status(200).json({ msg: 'Pianeta Distrutto' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});