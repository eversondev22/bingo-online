const express = require('express');
const usuarioRoutes = require('./routes/UsuarioRoutes');

const app = express();

app.use(express.json());
app.use(usuarioRoutes);

app.get('/', (req, res) => {
    res.send('🚀 Bem-vindo à API do ALEGUI!');
});

module.exports = app;