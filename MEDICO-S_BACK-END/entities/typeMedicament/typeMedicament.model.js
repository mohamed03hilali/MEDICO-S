const { poolPromise, sql } = require('../../config/db');

async function getAllTypes() {
  const pool = await poolPromise;
  const result = await pool.request().query(`
    SELECT * FROM [Type_Medicament]
  `);
  return result.recordset;
}

async function getTypeById(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`SELECT * FROM [Type_Medicament] WHERE ID_TYPE_MEDICAMENT = @id`);
  return result.recordset[0];
}

async function createType(type) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('NOM_TYPE', sql.VarChar(50), type.NOM_TYPE)
    .input('DESCRIPTION', sql.VarChar(250), type.DESCRIPTION || null)
    .input('UTILISATEUR_CREATION', sql.VarChar(50), type.UTILISATEUR_CREATION || 'system')
    .query(`
      INSERT INTO [Type_Medicament] (
        NOM_TYPE, DESCRIPTION, UTILISATEUR_CREATION, DATE_CREATION
      ) VALUES (
        @NOM_TYPE, @DESCRIPTION, @UTILISATEUR_CREATION, GETDATE()
      );
      SELECT SCOPE_IDENTITY() AS ID_TYPE_MEDICAMENT;
    `);
  return result.recordset[0].ID_TYPE_MEDICAMENT;
}

async function updateType(id, type) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('ID_TYPE_MEDICAMENT', sql.Int, id)
    .input('NOM_TYPE', sql.VarChar(50), type.NOM_TYPE)
    .input('DESCRIPTION', sql.VarChar(250), type.DESCRIPTION || null)
    .input('UTILISATEUR_MODIFICATION', sql.VarChar(50), type.UTILISATEUR_MODIFICATION || 'system')
    .query(`
      UPDATE [Type_Medicament]
      SET
        NOM_TYPE = @NOM_TYPE,
        DESCRIPTION = @DESCRIPTION,
        UTILISATEUR_MODIFICATION = @UTILISATEUR_MODIFICATION,
        DATE_MODIFICATION = GETDATE()
      WHERE ID_TYPE_MEDICAMENT = @ID_TYPE_MEDICAMENT
    `);
  return result.rowsAffected[0];
}

async function deleteType(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM [Type_Medicament] WHERE ID_TYPE_MEDICAMENT = @id');
  return result.rowsAffected[0];
}

module.exports = {
  getAllTypes,
  getTypeById,
  createType,
  updateType,
  deleteType
};
