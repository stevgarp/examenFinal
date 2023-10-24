const mongoose = require('mongoose');

// Define el esquema del paciente
const pacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  genero: { type: String, enum: ['Masculino', 'Femenino', 'Otro'] },
  direccion: {type: String},
  numeroTelefono: {type: String}
});

// Crea el modelo de Paciente
const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;