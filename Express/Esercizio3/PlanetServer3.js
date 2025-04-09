require('dotenv').config();
require('express-async-errors'); //(non c'è bisogno di try-catch)
const express = require('express');
const morgan = require('morgan');
const {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById
} = require('./Controller/Planets'); //Importa le funzioni

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Rotte che usano le funzioni del controller
app.get('/api/planets', getAll);
app.get('/api/planets/:id', getOneById);
app.post('/api/planets', create);
app.put('/api/planets/:id', updateById);
app.delete('/api/planets/:id', deleteById);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
