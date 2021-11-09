const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LibrosSchema = new Schema({
  titulo: { type: String, require: true, max: 60 },
  autor: { type: String, require: true, max: 60 },
  palabrasClaves: { type: String, require: true, max: 100 },
  fechaPublicacion: { type: String, require: true, max: 999 },
  editorial: { type: String, require: true, max: 40 },
  resumen: { type: String, require: true, max: 999 },
  unidades: { type: String, require: false, max: 999 },
});

module.exports = mongoose.model("Libros", LibrosSchema);
