const express = require('express');

const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');

router.post('/usuarios', UsuarioController.criarUsuario);
router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuarios/:id', UsuarioController.buscarUsuarioPorId);
router.post('/login', UsuarioController.login);
router.put('/usuarios/:id', UsuarioController.atualizarUsuario);
router.delete('/usuarios/:id', UsuarioController.deletarUsuario);

module.exports = router;