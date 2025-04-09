let planets = [ //Array di oggetti con ID e Name
    { id: 1, name: 'Earth' },
    { id: 2, name: 'Mars' }
  ];
  
  const Joi = require('joi');
  
  const planetSchema = Joi.object({ //Validazione oggetto
    name: Joi.string().min(1).required() //Ho dovuto cercare come usare joi: Serve a validare dati rivevuti (Stringa)
  });
  
  const getAll = (req, res) => { //Restituisce i pianeti con status 200 (validi)
    res.status(200).json(planets); 
  };
  
  const getOneById = (req, res) => { //Restituisce il pianeta specifico
    const id = parseInt(req.params.id); //parseInt Converte una stringa in numero
    const planet = planets.find(p => p.id === id); //Cerca tramite ID
    if (!planet) return res.status(404).json({ msg: 'Pianeta non trovato' }); //Se non lo trova: 404
    res.status(200).json(planet);
  };
  
  const create = (req, res) => { //Funzione per creare
    const { error } = planetSchema.validate(req.body); //validazione
    if (error) return res.status(400).json({ msg: error.details[0].message });
  
    const newPlanet = { //Crea un nuovo pianeta con ID successivo
      id: planets.length ? planets[planets.length - 1].id + 1 : 1, //(Cercato il metodo per aggiungere ID di 1)
      name: req.body.name
    };
  
    planets = [...planets, newPlanet];
    res.status(201).json({ msg: 'Pianeta Aggiunto' });
  };
  
  const updateById = (req, res) => { // Funzione per aggiornare
    const id = parseInt(req.params.id); //parseInt Converte una stringa in numero
    const existingPlanet = planets.find(p => p.id === id); //Identificare pianeta
    if (!existingPlanet) return res.status(404).json({ msg: 'Pianeta non trovato' });
  
    const { error } = planetSchema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });
  
    planets = planets.map(p => //Aggiorna
      p.id === id ? { ...p, name: req.body.name } : p
    );
  
    res.status(200).json({ msg: 'Pianeta Aggiornato' });
  };
  
  const deleteById = (req, res) => { //Funzione Eliminazione
    const id = parseInt(req.params.id); //parseInt Converte una stringa in numero
    const exists = planets.find(p => p.id === id);
    if (!exists) return res.status(404).json({ msg: 'Pianeta non trovato' });
  
    planets = planets.filter(p => p.id !== id); //Rimuove il pianeta
    res.status(200).json({ msg: 'Pianeta Distrutto' });
  };
  
  module.exports = { //Esportazione funzioni
    getAll,
    getOneById,
    create,
    updateById,
    deleteById
  };
  