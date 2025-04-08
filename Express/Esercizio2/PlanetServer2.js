require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const Joi = require('joi');

const app = express();

let planets = [
  { id: 1, name: 'Earth' },
  { id: 2, name: 'Mars' }
];

app.use(express.json());
app.use(morgan('dev'));

// JOI schema
const planetSchema = Joi.object({
  name: Joi.string().min(2).required()
});

// GET all planets
app.get('/api/planets', (req, res) => {
  res.status(200).json(planets);
});

// GET planet by id
app.get('/api/planets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const planet = planets.find(p => p.id === id);
  if (!planet) return res.status(404).json({ msg: 'Planet not found' });
  res.status(200).json(planet);
});

// POST create a new planet
app.post('/api/planets', (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const newPlanet = {
    id: planets.length ? planets[planets.length - 1].id + 1 : 1,
    name: req.body.name
  };

  planets.push(newPlanet);
  res.status(201).json({ msg: 'Planet created successfully' });
});

// PUT update a planet
app.put('/api/planets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const planet = planets.find(p => p.id === id);
  if (!planet) return res.status(404).json({ msg: 'Planet not found' });

  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  planet.name = req.body.name;
  res.status(200).json({ msg: 'Planet updated successfully' });
});

// DELETE a planet
app.delete('/api/planets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = planets.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ msg: 'Planet not found' });

  planets.splice(index, 1);
  res.status(200).json({ msg: 'Planet deleted successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});