const Paciente = require('./fichaP.modelo.js');

const fichaP = {
    createPaciente: async (req, res) => {
        try {
          const paciente = new Paciente(req.body);
          console.log(paciente);
          const pacienteGuardado = await paciente.save();
          res.status(201).json(pacienteGuardado);
        } catch (error) {
          res.status(500).json({ error: 'Error al crear el paciente' });
        }
      },
    getPacientes: async (req, res) => {
        try {
          const pacientes = await Paciente.find();
          res.status(200).json(pacientes);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener pacientes' });
        }
      },
    getPacienteId: obtenerPacientePorId = async (req, res) => {
        try {
          const paciente = await Paciente.findById(req.params.id);
          if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
          }
          res.status(200).json(paciente);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener el paciente' });
        }
      },
    updatePaciente: async (req, res) => {
        try {
          const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          });
          if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
          }
          res.status(200).json(paciente);
        } catch (error) {
          res.status(500).json({ error: 'Error al actualizar el paciente' });
        }
      },
    deletePaciente: async (req, res) => {
        try {
          const paciente = await Paciente.findByIdAndRemove(req.params.id);
          if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
          }
          res.status(204).send();
        } catch (error) {
          res.status(500).json({ error: 'Error al eliminar el paciente' });
        }
      }
};

module.exports = fichaP;
