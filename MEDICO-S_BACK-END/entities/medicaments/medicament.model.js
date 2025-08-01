const { poolPromise, sql } = require('../../config/db');

async function getAllMedicaments() {
  const pool = await poolPromise;
  const result = await pool.request().query(`
    SELECT * FROM [Medicament]
  `);
  return result.recordset;
}

async function getMedicamentById(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`SELECT * FROM [Medicament] WHERE ID_MEDICAMENT = @id`);
  return result.recordset[0];
}

async function createMedicament(medicament) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('ID_TYPE_MEDICAMENT', sql.Int, medicament.ID_TYPE_MEDICAMENT)
    .input('FORME', sql.VarChar(50), medicament.FORME || null)
    .input('NOM_TYPE', sql.VarChar(50), medicament.NOM_TYPE || null)
    .input('DOSAGE', sql.VarChar(50), medicament.DOSAGE || null)
    .input('CODE_BARRE', sql.VarChar(50), medicament.CODE_BARRE || null)
    .input('DESCRIPTION', sql.VarChar(250), medicament.DESCRIPTION || null)
    .input('NOM_SOCIETE', sql.VarChar(50), medicament.NOM_SOCIETE || null)
    .input('UTILISATEUR_CREATION', sql.VarChar(50), medicament.UTILISATEUR_CREATION || 'system')
    .query(`
      INSERT INTO [Medicament] (
        ID_TYPE_MEDICAMENT, FORME, NOM_TYPE, DOSAGE, CODE_BARRE,
        DESCRIPTION, NOM_SOCIETE, UTILISATEUR_CREATION, DATE_CREATION
      ) VALUES (
        @ID_TYPE_MEDICAMENT, @FORME, @NOM_TYPE, @DOSAGE, @CODE_BARRE,
        @DESCRIPTION, @NOM_SOCIETE, @UTILISATEUR_CREATION, GETDATE()
      );
      SELECT SCOPE_IDENTITY() AS ID_MEDICAMENT;
    `);
  return result.recordset[0].ID_MEDICAMENT;
}

async function updateMedicament(id, medicament) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('ID_MEDICAMENT', sql.Int, id)
    .input('ID_TYPE_MEDICAMENT', sql.Int, medicament.ID_TYPE_MEDICAMENT)
    .input('FORME', sql.VarChar(50), medicament.FORME || null)
    .input('NOM_TYPE', sql.VarChar(50), medicament.NOM_TYPE || null)
    .input('DOSAGE', sql.VarChar(50), medicament.DOSAGE || null)
    .input('CODE_BARRE', sql.VarChar(50), medicament.CODE_BARRE || null)
    .input('DESCRIPTION', sql.VarChar(250), medicament.DESCRIPTION || null)
    .input('NOM_SOCIETE', sql.VarChar(50), medicament.NOM_SOCIETE || null)
    .input('UTILISATEUR_MODIFICATION', sql.VarChar(50), medicament.UTILISATEUR_MODIFICATION || 'system')
    .query(`
      UPDATE [Medicament]
      SET
        ID_TYPE_MEDICAMENT = @ID_TYPE_MEDICAMENT,
        FORME = @FORME,
        NOM_TYPE = @NOM_TYPE,
        DOSAGE = @DOSAGE,
        CODE_BARRE = @CODE_BARRE,
        DESCRIPTION = @DESCRIPTION,
        NOM_SOCIETE = @NOM_SOCIETE,
        UTILISATEUR_MODIFICATION = @UTILISATEUR_MODIFICATION,
        DATE_MODIFICATION = GETDATE()
      WHERE ID_MEDICAMENT = @ID_MEDICAMENT
    `);
  return result.rowsAffected[0];
}

async function deleteMedicament(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM [Medicament] WHERE ID_MEDICAMENT = @id');
  return result.rowsAffected[0];
}

module.exports = {
  getAllMedicaments,
  getMedicamentById,
  createMedicament,
  updateMedicament,
  deleteMedicament
};
