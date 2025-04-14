const express = require('express');
const app = express();
const planetsRoutes = require('./routes/planets');

// Aggiungi il debug prima di usare le rotte
app.post('/debug', (req, res) => {
  console.log("Received data:", req.body);
  res.json({ message: 'Data received successfully' });
});

app.use(express.json());
app.use('/planets', planetsRoutes);
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
