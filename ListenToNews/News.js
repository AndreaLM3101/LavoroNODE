import { EventEmitter } from "node:events"; // Modificato per usare modules (e non cambiare type in commonjs in package.json)


function createNewsFeed() {
  const emitter = new EventEmitter();

  setInterval(() => {
    emitter.emit("newsEvent", "News: A thing happened in a place.");
  }, 1000);

  setInterval(() => {
    emitter.emit("breakingNews", "Breaking news! A BIG thing happened.");
  }, 4000);

  setTimeout(() => { 
    emitter.emit("error", new Error("News feed connection error"));
  }, 5000);

  return emitter; 
}
const newsFeed = createNewsFeed();

newsFeed.on("newsEvent", (data) => { //ricevere un evento
  console.log(data);
});

newsFeed.on("breakingNews", (data) => { //ricevere un evento
  console.log(data);
});

newsFeed.on("error", (err) => { //ricevere un evento
  console.error("Error:", err.message);
});
