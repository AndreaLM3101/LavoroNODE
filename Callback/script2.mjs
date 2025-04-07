import fs from "node:fs"

let data = "This is a test 2"; //definire i dati da scrivere

fs.writeFile("text.txt", data, (err) => { //Scrivere i dati nel file
  if(err) {console.log(err)} // Caso di errore
  else {console.log("Messaggio scritto correttemente"); //messaggio di successo
    console.log(fs.readFileSync("test.txt", "utf8")); // Legge il contenuto e stampa
  }
})