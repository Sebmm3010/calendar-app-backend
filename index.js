const express = require("express");
const { dbConection } = require("./db/config");
const cors = require('cors');
require('dotenv').config();

const app = express();

// Bade de datos
dbConection();

// Configurando CORS
app.use(cors());
// Public
app.use(express.static('public'));

// Lectura y parseo de body
app.use(express.json());


// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Escuchar
app.listen(process.env.PORT, () => {
    console.log(`Server corriendo en ${process.env.PORT}`);
});