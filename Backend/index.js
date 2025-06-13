const express = require('express');
const cors = require('cors');
const path = require('path');

const authRouters = require('./Routes/auth');
require('dotenv').config();

const app = express(); 

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'fronted')));

// Tus rutas API
app.use('/api/auth', authRouters);

app.listen(3000, () => {
    console.log('Servidor en local');
});
