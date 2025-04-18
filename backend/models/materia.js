const db = require('../config/db');

// Crear una nueva materia con nombre, carrera y capacidad
const crearMateria = (nombre, carreraFK, capacidad, callback) => {
  const safeNombre = typeof nombre === 'string' ? nombre : String(nombre);
  const sql = `INSERT INTO Materia (nombre_materia, carrera_FK, capacidad) VALUES (?, ?, ?)`;
  db.query(sql, [safeNombre, carreraFK, capacidad], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Obtener todas las materias con el nombre de la carrera asociada
const obtenerMaterias = (callback) => {
  const sql = `SELECT * FROM Materia INNER JOIN Carreras ON Materia.carrera_FK = Carreras.ID_carrera`;

  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  crearMateria,
  obtenerMaterias
};