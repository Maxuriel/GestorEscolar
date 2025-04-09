const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const carrerasRoutes = require('./routes/carreras');
const materiasRoutes = require('./routes/materias');
const salonesRouter = require('./routes/salones');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/carreras', carrerasRoutes);
app.use('/materias', materiasRoutes);
app.use('/salones', salonesRouter);


app.get('/', (req, res) => {
  res.send('Gestor Escolar Backend funcionando 🚀');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});
