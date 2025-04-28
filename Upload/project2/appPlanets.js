const express = require('express');
const app = express();
const planetsRoutes = require('./routes/planets');
const morgan = require("morgan")

app.use(morgan("dev"));
app.post('/debug', (req, res) => { //debug
  console.log("Received data:", req.body);
  res.json({ message: 'Data received successfully' });
});

app.use(express.urlencoded({ extended: true })); //Cercato, leggere i dati per HTML
app.use(express.json());
app.use('/planets', planetsRoutes);


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
