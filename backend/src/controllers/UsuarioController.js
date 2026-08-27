const UsuarioModel = require('../models/UsuarioModel');
const bcrypt = require('bcrypt');

// ============================================================================
// Função: criarUsuario
// Objetivo:
// Receber os dados enviados pelo cliente e cadastrar um novo usuário.
// ============================================================================
const criarUsuario = async (req, res) => {

  try {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: 'Nome, email e senha são obrigatórios.'
      });
    }
    // Gera um hash seguro da senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    
    // Salva a senha criptografada no banco
    const usuario = await UsuarioModel.criarUsuario(nome, email, senhaCriptografada);

    return res.status(201).json({
      id : usuario.id,
      nome: usuario.nome,
      email: usuario.email
    });

  } catch (erro) {

    console.error(erro);

    return res.status(500).json({
      erro: 'Erro ao criar usuário.'
    });

  }

};

// ============================================================================
// Função: listarUsuarios
// Objetivo:
// Receber a requisição HTTP, buscar todos os usuários no banco de dados
// e devolver a lista em formato JSON.
// ============================================================================
const listarUsuarios = async (req, res) => {

  try {

    // Chama o Model para buscar todos os usuários
    const usuarios = await UsuarioModel.listarUsuarios();
    const usuariosSemSenha = usuarios.map(usuario => ({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }));
    // Retorna a lista em formato JSON
    return res.status(200).json(usuariosSemSenha);

  } catch (erro) {

    console.error(erro);

    return res.status(500).json({
      erro: 'Erro ao listar usuários.'
    });

  }

};

// ============================================================================
// Função: buscarUsuarioPorId
// Objetivo:
// Buscar um usuário pelo ID informado na URL.
// ============================================================================
const buscarUsuarioPorId = async (req, res) => {

  try {

    const { id } = req.params;

    const usuario = await UsuarioModel.buscarUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      });
    }

    return res.status(200).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    });

  } catch (erro) {

    console.error(erro);

    return res.status(500).json({
      erro: 'Erro ao buscar usuário.'
    });

  }

};

const buscarUsuarioPorEmail = async (req, res) => {

  try { 

    const { email } = req.body;

    const usuario = await UsuarioModel.buscarUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      });
    }

    return res.status(200).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    });

  } catch (erro) {

    console.error(erro);

    return res.status(500).json({
      erro: 'Erro ao buscar usuário.'
    });

  }

};

// ============================================================================
// Função: atualizarUsuario
// Objetivo:
// Atualizar o nome e o e-mail de um usuário existente.
// ============================================================================
const atualizarUsuario = async (req, res) => {

  try {

    // Recebe o ID informado na URL
    const { id } = req.params;

    // Recebe nome e email enviados pelo cliente
    const { nome, email } = req.body;

    // Valida se os campos obrigatórios foram enviados
    if (!nome || !email) {
      return res.status(400).json({
        erro: 'Nome e email são obrigatórios.'
      });
    }

    // Chama o Model para atualizar o usuário
    const usuario = await UsuarioModel.atualizarUsuario(id, nome, email);

    // Verifica se o usuário existe
    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      });
    }

    // Retorna os dados atualizados sem a senha
    return res.status(200).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    });

  } catch (erro) {

    console.error(erro);

    return res.status(500).json({
      erro: 'Erro ao atualizar usuário.'
    });

  }

};

//===========================================================================
// Função: login
// Objetivo:
// Realizar o login de um usuário existente.
//===========================================================================
const login = async (req, res) => {

  try {
  //Recebe o email e a senha do corpo da requisição
    const { email, senha } = req.body;
  //Busca o usuário pelo email
    const usuario = await UsuarioModel.buscarUsuarioPorEmail(email);

  //Verifica se o usuário existe
    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        erro: 'Senha inválida.'
      });
    }

    return res.status(200).json({
      message: 'Usuário encontrado.',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  }
  catch (erro) {

    console.error(erro);
    return res.status(500).json({
      erro: 'Erro ao realizar login.'
    });
  }
};

// Delete usuario
const deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await UsuarioModel.deletarUsuario(id);

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      });
    }

    return res.status(200).json({
      message: 'Usuário deletado com sucesso.',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (erro) {

    console.error(erro);
    return res.status(500).json({
      erro: 'Erro ao deletar usuário.'
    });

  }
};

// Exporta as funções para serem utilizadas em outros arquivos
module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  buscarUsuarioPorEmail,
  atualizarUsuario,
  login,
  deletarUsuario
};