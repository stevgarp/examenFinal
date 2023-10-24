const express = require('express');
const mongoose = require('mongoose');
const {Auth, isAuthenticated}  = require('./auth.js');
const fichaP = require('./fichaP.controller.js');

const app = express();
app.use(express.json());
const port = 3000;

async function conectarDB() {
  try {
    await mongoose.connect(`mongodb://steven:783836@monguito:27017/Examenfinal?authSource=admin`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB con Mongoose');
  } catch (error) {
    console.error('Error al conectar a MongoDB con Mongoose:', error);
  }
}
conectarDB();

app.post('/registrar-usuario', Auth.register);
app.post('/login', Auth.login);
app.post('/create-paciente', isAuthenticated, fichaP.createPaciente );
app.get('/get-pacientes', isAuthenticated, fichaP.getPacientes);
app.get('/get-paciente/:id', isAuthenticated, fichaP.getPacienteId);
app.put('/update-paciete/:id', isAuthenticated, fichaP.updatePaciente);
app.delete('/delete-paciente/:id', isAuthenticated, fichaP.deletePaciente);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('*', (req, res) => {
    res.status(404).send('404 not found');
});

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});