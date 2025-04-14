const db = require('./db');

async function setupDb() {  //Per setuppare la tabella
  await db.none(`DROP TABLE IF EXISTS planets;`); // creo la tabella (db.non è cercato)
  await db.none(`
    CREATE TABLE planets (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT
    );
  `); // Sopra ho aggiunto image TEXT
  await db.none(`INSERT INTO planets (name) VALUES ('Earth'), ('Mars');`); // creo 2 pianeti
  console.log("Database setup complete.");
}

setupDb();
