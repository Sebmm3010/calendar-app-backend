const express = require("express");
const { dbConection } = require("./db/config");
require('dotenv').config();

const app = express();

// Bade de datos

dbConection();

// Public
app.use(express.static('public'));

// Lectura y parseo de body
app.use( express.json() );


// Rutas
app.use('/api/auth', require('./routes/auth'));

// Escuchar
app.listen(process.env.PORT, () => {
    console.log(`Server corriendo en ${process.env.PORT}`);
});