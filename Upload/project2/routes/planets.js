const express = require("express");
const router = express.Router();
const controller = require("../controllers/planetsController2");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // salva i file nella cartella uploads/


//Tutte le rotte che si collegano alle funzioni controller
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.post("/:id/image", upload.single("image"), controller.uploadImage); //Rotta per caricare immagini (anche qui collegato al controller)

module.exports = router;