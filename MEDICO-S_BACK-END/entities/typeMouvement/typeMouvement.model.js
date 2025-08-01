const { poolPromise, sql } = require('../../config/db');

async function getAllTypes() {
  const pool = await poolPromise;
  const result = await pool.request().query(`SELECT * FROM Type_Mouvement`);
  return result.recordset;
}

async function getTypeById(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`SELECT * FROM Type_Mouvement WHERE ID_TYPE_ST = @id`);
  return result.recordset[0];
}

async function createType(type) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('NOM', sql.VarChar(50), type.NOM)
    .input('DESCRIPTION', sql.VarChar(250), type.DESCRIPTION || null)
    .input('UTILISATEUR_CREATION', sql.VarChar(50), type.UTILISATEUR_CREATION || 'system')
    .query(`
      INSERT INTO Type_Mouvement (
        NOM, DESCRIPTION, UTILISATEUR_CREATION, DATE_CREATION
      ) VALUES (
        @NOM, @DESCRIPTION, @UTILISATEUR_CREATION, GETDATE()
      );
      SELECT SCOPE_IDENTITY() AS ID_TYPE_ST;
    `);
  return result.recordset[0].ID_TYPE_ST;
}

async function updateType(id, type) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('ID_TYPE_ST', sql.Int, id)
    .input('NOM', sql.VarChar(50), type.NOM)
    .input('DESCRIPTION', sql.VarChar(250), type.DESCRIPTION || null)
    .input('UTILISATEUR_MODIFICATION', sql.VarChar(50), type.UTILISATEUR_MODIFICATION || 'system')
    .query(`
      UPDATE Type_Mouvement
      SET
        NOM = @NOM,
        DESCRIPTION = @DESCRIPTION,
        UTILISATEUR_MODIFICATION = @UTILISATEUR_MODIFICATION,
        DATE_MODIFICATION = GETDATE()
      WHERE ID_TYPE_ST = @ID_TYPE_ST
    `);
  return result.rowsAffected[0];
}

async function deleteType(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Type_Mouvement WHERE ID_TYPE_ST = @id');
  return result.rowsAffected[0];
}

module.exports = {
  getAllTypes,
  getTypeById,
  createType,
  updateType,
  deleteType
};
