let planets = [
    { id: 1, name: 'Earth' },
    { id: 2, name: 'Mars' }
  ];
  
  const Joi = require('joi');
  
  const planetSchema = Joi.object({
    name: Joi.string().min(2).required()
  });
  
  const getAll = (req, res) => {
    res.status(200).json(planets);
  };
  
  const getOneById = (req, res) => {
    const id = parseInt(req.params.id);
    const planet = planets.find(p => p.id === id);
    if (!planet) return res.status(404).json({ msg: 'Planet not found' });
    res.status(200).json(planet);
  };
  
  const create = (req, res) => {
    const { error } = planetSchema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });
  
    const newPlanet = {
      id: planets.length ? planets[planets.length - 1].id + 1 : 1,
      name: req.body.name
    };
  
    planets = [...planets, newPlanet];
    res.status(201).json({ msg: 'Planet created successfully' });
  };
  
  const updateById = (req, res) => {
    const id = parseInt(req.params.id);
    const existingPlanet = planets.find(p => p.id === id);
    if (!existingPlanet) return res.status(404).json({ msg: 'Planet not found' });
  
    const { error } = planetSchema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });
  
    planets = planets.map(p =>
      p.id === id ? { ...p, name: req.body.name } : p
    );
  
    res.status(200).json({ msg: 'Planet updated successfully' });
  };
  
  const deleteById = (req, res) => {
    const id = parseInt(req.params.id);
    const exists = planets.find(p => p.id === id);
    if (!exists) return res.status(404).json({ msg: 'Planet not found' });
  
    planets = planets.filter(p => p.id !== id);
    res.status(200).json({ msg: 'Planet deleted successfully' });
  };
  
  module.exports = {
    getAll,
    getOneById,
    create,
    updateById,
    deleteById
  };
  