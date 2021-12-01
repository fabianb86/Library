const Libro = require("../models/libros.model");

let response = {
  msg: "",
  exito: false,
};

// CREATE
exports.create = function (req, res) {
  let libro = new Libro({
    titulo: req.body.titulo,
    autor: req.body.autor,
    palabrasClaves: req.body.palabrasClaves,
    fechaPublicacion: req.body.fechaPublicacion,
    editorial: req.body.editorial,
    resumen: req.body.resumen,
    unidades: req.body.unidades,
  });

  libro.save(function (err) {
    if (err) {
      console.error(err),
        (response.exito = false),
        (response.msg = "Error al guardar el libro");
      res.json(response);
      return;
    }

    (response.exito = true),
      (response.msg = "El libro se guardó correctamente");
    res.json(response);
  });
};

// READ
exports.find = function (req, res) {
  Libro.find(function (err, libros) {
    res.json(libros);
  });
};

exports.findOne = function (req, res) {
  Libro.findOne({ _id: req.params.id }, function (err, libro) {
    res.json(libro);
  });
};

// UPDATE
exports.update = function (req, res) {
  let libro = {
    titulo: req.body.titulo,
    autor: req.body.autor,
    palabrasClaves: req.body.palabrasClaves,
    fechaPublicacion: req.body.fechaPublicacion,
    editorial: req.body.editorial,
    resumen: req.body.resumen,
    unidades: req.body.unidades,
  };

  Libro.findByIdAndUpdate(req.params.id, { $set: libro }, function (err) {
    if (err) {
      (console.log = false),
        (response.exito = false),
        (response.msg = "Error al modificar el Libro");
      res.json(response);
      return;
    }

    (response.exito = true),
      (response.msg = "El libro se modificó correctamente");
    res.json(response);
  });
};

// DELETE
exports.remove = function (req, res) {
  Libro.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      (console.error = false),
        (response.exito = false),
        (response.msg = "Error al eliminar el Libro");
      res.json(response);
      return;
    }

    (response.exito = true),
      (response.msg = "El libro se eliminó correctamente");
    res.json(response);
  });
};
