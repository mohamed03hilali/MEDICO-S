const { poolPromise, sql } = require('../../config/db');

async function getAllRoles() {
  const pool = await poolPromise;
  const result = await pool.request().query(`SELECT * FROM [Role]`);
  return result.recordset;
}

async function getRoleById(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`SELECT * FROM [Role] WHERE ID_ROLE = @id`);
  return result.recordset[0];
}

async function createRole(role) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('NOM_ROLE', sql.VarChar(50), role.NOM_ROLE)
    .input('DESCRIPTION', sql.VarChar(250), role.DESCRIPTION || null)
    .input('UTILISATEUR_CREATION', sql.VarChar(50), role.UTILISATEUR_CREATION || 'system')
    .query(`
      INSERT INTO [Role] (
        NOM_ROLE, DESCRIPTION, UTILISATEUR_CREATION, DATE_CREATION
      ) VALUES (
        @NOM_ROLE, @DESCRIPTION, @UTILISATEUR_CREATION, GETDATE()
      );
      SELECT SCOPE_IDENTITY() AS ID_ROLE;
    `);
  return result.recordset[0].ID_ROLE;
}

async function updateRole(id, role) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('ID_ROLE', sql.Int, id)
    .input('NOM_ROLE', sql.VarChar(50), role.NOM_ROLE)
    .input('DESCRIPTION', sql.VarChar(250), role.DESCRIPTION || null)
    .input('UTILISATEUR_MODIFICATION', sql.VarChar(50), role.UTILISATEUR_MODIFICATION || 'system')
    .query(`
      UPDATE [Role]
      SET
        NOM_ROLE = @NOM_ROLE,
        DESCRIPTION = @DESCRIPTION,
        UTILISATEUR_MODIFICATION = @UTILISATEUR_MODIFICATION,
        DATE_MODIFICATION = GETDATE()
      WHERE ID_ROLE = @ID_ROLE
    `);
  return result.rowsAffected[0];
}

async function deleteRole(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM [Role] WHERE ID_ROLE = @id');
  return result.rowsAffected[0];
}

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};
