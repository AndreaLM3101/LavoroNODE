require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');

const app = express();

let planets = [ //dummy "database"
  { id: 1, name: 'Earth' },
  { id: 2, name: 'Mars' }
];

app.use(express.json()); //Accetta json dal client
app.use(morgan('dev')); // richieste HTTP nella console in formato compatto: GET / 200 2.966 ms - 25

app.get('/', (req, res) => { //Esegue quando avviene una richiesta su "/"
    res.json(planets);
  });

const PORT = process.env.PORT || 3000; //cercato

app.listen(PORT, () => { //cercato
  console.log(`Server is running on http://localhost:${PORT}`);
});