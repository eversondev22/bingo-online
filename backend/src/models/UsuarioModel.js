const pool = require('../config/database');

// ============================================================================
// Função: criarUsuario
// Objetivo:
// Inserir um novo usuário na tabela "usuarios".
// ============================================================================
const criarUsuario = async (nome, email, senha) => {

  const query = `
    INSERT INTO usuarios (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [nome, email, senha];

  const resultado = await pool.query(query, values);

  return resultado.rows[0];
};

// ============================================================================
// Função: listarUsuarios
// Objetivo:
// Buscar todos os usuários cadastrados na tabela "usuarios".
// ============================================================================
const listarUsuarios = async () => {

  const query = `
    SELECT *
    FROM usuarios
    ORDER BY id;
  `;

  const resultado = await pool.query(query);

  return resultado.rows;
};

// ============================================================================
// Função: buscarUsuarioPorId
// Objetivo:
// Buscar um usuário pelo ID.
// ============================================================================
const buscarUsuarioPorId = async (id) => {

  const query = `
    SELECT *
    FROM usuarios
    WHERE id = $1;
  `;

  const values = [id];

  const resultado = await pool.query(query, values);

  return resultado.rows[0];
};

// ============================================================================
// Função: buscarUsuarioPorEmail
// Objetivo:
// Buscar um usuário pelo e-mail.
// ============================================================================
const buscarUsuarioPorEmail = async (email) => {

  const query = `
    SELECT *
    FROM usuarios
    WHERE email = $1;
  `;

  const values = [email];

  const resultado = await pool.query(query, values);

  return resultado.rows[0];
};

// ============================================================================
// Função: atualizarUsuario
// Objetivo:
// Atualizar o nome e o e-mail de um usuário existente.
// ============================================================================
const atualizarUsuario = async (id, nome, email) => {

  const query = `
    UPDATE usuarios
    SET nome = $1,
        email = $2
    WHERE id = $3
    RETURNING *;
  `;

  const values = [nome, email, id];

  const resultado = await pool.query(query, values);

  return resultado.rows[0];
};

//============================================================================
// Função: DeletarUsuario
// Objetivo:
// Deletar um usuário existente.
// ============================================================================

const deletarUsuario = async (id) => {

  const query = `
    DELETE FROM usuarios
    WHERE id = $1
    RETURNING *;
  `;

  const values = [id];

  const resultado = await pool.query(query, values);

  return resultado.rows[0];
};

// ============================================================================
// Exporta todas as funções do Model
// ============================================================================
module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  buscarUsuarioPorEmail,
  atualizarUsuario,
  deletarUsuario
};