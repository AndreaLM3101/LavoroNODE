import { writeFile } from 'node:fs'; // Importa solo la funzione writeFile dal modulo 'fs' (File System)
import { Buffer } from 'node:buffer'; // Importa il modulo Buffer per lavorare con dati

const data = new Uint8Array(Buffer.from('Hello Node.js')); // Buffer converte in dati // Uint8Array Converte in un array

writeFile('message.txt', data, "utf-8" , (err) => { // Scrive i dati nel file 'message.txt'
    if (err) throw err; // Se c'è un errore, lo lancia e interrompe il programma
    console.log('The file has been saved!');
});



  // import * as fs from 'node:fs'; // IMPORTA FILE SYSTEM PER LAVORARE AI FILE
// import { Buffer } from 'node:buffer';

// const data = new Uint8Array(Buffer.from('Hello Node.js'));

// fs.writeFile('message.txt', data, (err) => {
//  if (err) throw err;
// console.log('The file has been saved!');
// });