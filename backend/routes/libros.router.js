const express = require("express");
const router = express.Router();
const librosController = require("../controllers/libros.controller");

// RUTAS CRUD
router.post("/", librosController.create);
router.get("/", librosController.find);
router.get("/:id", librosController.findOne);
router.put("/:id", librosController.update);
router.delete("/:id", librosController.remove);

module.exports = router;
