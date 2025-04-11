const pgp = require("pg-promise")(); //connessione a postgres... il metodo del video non funzionava e ho cercato come fare
const db = pgp("postgres://postgres:32460@localhost:5432/postgres"); //non sono riuscito a creare il database myapp e l'ho chiamato postgres (di default)
module.exports = db;