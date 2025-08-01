const { poolPromise, sql } = require('../../config/db');

async function getAllUsers() {
  const pool = await poolPromise;
  const result = await pool.request().query(`
    SELECT
      ID_USER,
      USER_LOGIN,
      NOM_USER,
      PRENOM_USER,
      EMAIL,
      MDP,
      FONCTION,
      ACTIF,
      UTILISATEUR_CREATION,
      UTILISATEUR_MODIFICATION,
      DATE_CREATION,
      DATE_MODIFICATION
    FROM [User]
  `);
  return result.recordset;
}

async function getUserById(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`
      SELECT * FROM [User] WHERE ID_USER = @id
    `);
  return result.recordset[0];
}

async function createUser(user) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('login', sql.VarChar(50), user.USER_LOGIN)
    .input('nom', sql.VarChar(50), user.NOM_USER)
    .input('prenom', sql.VarChar(50), user.PRENOM_USER)
    .input('email', sql.VarChar(150), user.EMAIL || null)
    .input('mdp', sql.VarChar(250), user.MDP)
    .input('fonction', sql.VarChar(100), user.FONCTION || null)
    .input('actif', sql.Bit, user.ACTIF)
    .input('createdBy', sql.VarChar(50), user.UTILISATEUR_CREATION || 'system')
    .query(`
      INSERT INTO [User] (
        USER_LOGIN, NOM_USER, PRENOM_USER, EMAIL, MDP, FONCTION, ACTIF, UTILISATEUR_CREATION, DATE_CREATION
      ) VALUES (
        @login, @nom, @prenom, @email, @mdp, @fonction, @actif, @createdBy, GETDATE()
      );
      SELECT SCOPE_IDENTITY() AS ID_USER;
    `);
  return result.recordset[0].ID_USER;
}

async function updateUser(id, user) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .input('login', sql.VarChar(50), user.USER_LOGIN)
    .input('nom', sql.VarChar(50), user.NOM_USER)
    .input('prenom', sql.VarChar(50), user.PRENOM_USER)
    .input('email', sql.VarChar(150), user.EMAIL || null)
    .input('mdp', sql.VarChar(250), user.MDP)
    .input('fonction', sql.VarChar(100), user.FONCTION || null)
    .input('actif', sql.Bit, user.ACTIF)
    .input('modifiedBy', sql.VarChar(50), user.UTILISATEUR_MODIFICATION || 'system')
    .query(`
      UPDATE [User]
      SET
        USER_LOGIN = @login,
        NOM_USER = @nom,
        PRENOM_USER = @prenom,
        EMAIL = @email,
        MDP = @mdp,
        FONCTION = @fonction,
        ACTIF = @actif,
        UTILISATEUR_MODIFICATION = @modifiedBy,
        DATE_MODIFICATION = GETDATE()
      WHERE ID_USER = @id
    `);
  return result.rowsAffected[0];
}

async function deleteUser(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM [User] WHERE ID_USER = @id');
  return result.rowsAffected[0];
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
