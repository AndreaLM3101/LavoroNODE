import { createServer } from "node:http";

const server = createServer((request, response) => { //Risposta client e server. Ho visto online che si può abbreviare in req e rec
  console.log("request received"); 

  response.statusCode = 200; // Stato della risposta, 200 = Ok/Successo / 300= temporaneo / 400 = errori client / 500 = Errori Server

  response.setHeader("Content-Type", "text/html"); //Specifica il tipo di contenuto

  response.end(
    "<html><body><h1>Lavoro Node Server</h1></body></html>"
  );
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`); //Indica il link
});