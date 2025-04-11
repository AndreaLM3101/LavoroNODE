const db = require("../db");

exports.getAll = (req, res) => {
  db.any("SELECT * FROM planets")  // Seleziona tutti i pianeti
    .then(data => res.json(data))  // Risponde con i dati in formato JSON
    .catch(err => res.status(500).json({ error: err.message }));  // Gestisce eventuali errori
};

exports.getById = (req, res) => {
  db.oneOrNone("SELECT * FROM planets WHERE id=$1", [req.params.id])  // Seleziona il pianeta con l'id specificato
    .then(data => {
      if (!data) return res.status(404).send("Not found");  // Se il pianeta non è trovato, ritorna 404
      res.json(data);  // Altrimenti risponde con i dati del pianeta
    })
    .catch(err => res.status(500).json({ error: err.message })); 
};

exports.create = (req, res) => {
  // Verifica se 'name' è presente nel corpo della richiesta
  console.log("Received body:", req.body);

  if (!req.body || !req.body.name) { // Aggiungi un controllo per assicurarci che il body e il nome siano presenti
    return res.status(400).json({ error: "Name is required" });
  }

  db.none("INSERT INTO planets (name) VALUES ($1)", [req.body.name])  // Inserisce un nuovo pianeta con il nome fornito
    .then(() => res.status(201).send("Created"))  // Risponde con 201 Created
    .catch(err => res.status(500).json({ error: err.message })); 
};

exports.update = (req, res) => {
  // Verifica se 'name' è presente nel corpo della richiesta
  if (!req.body.name) {
    return res.status(400).json({ error: "Name is required" });
  }

  db.none("UPDATE planets SET name=$2 WHERE id=$1", [req.params.id, req.body.name])  // Aggiorna il nome del pianeta con l'id specificato
    .then(() => res.send("Updated"))  // Risponde con un messaggio di successo
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.remove = (req, res) => {
  db.none("DELETE FROM planets WHERE id=$1", [req.params.id])  // Elimina il pianeta con l'id specificato
    .then(() => res.send("Deleted"))  // Risponde con un messaggio di successo
    .catch(err => res.status(500).json({ error: err.message }));
};
