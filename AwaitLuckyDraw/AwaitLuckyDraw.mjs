function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }

async function getResults() {
    try {
      const resultTina = await luckyDraw("Tina"); //Aspetta il risultato
      console.log(resultTina); // Mostra il risultato se Tina vince
    } catch (error) {
      console.error(error.message); // Mostra l'errore se Tina perde
    }
  
    try {
      const resultJorge = await luckyDraw("Jorge"); 
      console.log(resultJorge);
    } catch (error) {
      console.error(error.message); 
    }
  
    try {
      const resultJulien = await luckyDraw("Julien");
      console.log(resultJulien);
    } catch (error) {
      console.error(error.message);
    }
  }

  getResults();

  