const { poolPromise, sql } = require('../../config/db');



async function getAllFournisseurs() {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .query(`
      SELECT
        ID_FOURNISSEUR,
        NOM_FOURNISSEUR,
        TYPE_FOURNISSEUR,
        ADRESSE,
        TELE,
        EMAIL,
        UTILISATEUR_CREATION,
        UTILISATEUR_MODIFICATION,
        DATE_CREATION,
        DATE_MODIFICATION
      FROM [Fournisseur]
    `);
  return result.recordset;
}

async function getFournisseurById(id) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', sql.Int, id)
    .query(`
      SELECT
        ID_FOURNISSEUR,
        NOM_FOURNISSEUR,
        TYPE_FOURNISSEUR,
        ADRESSE,
        TELE,
        EMAIL,
        UTILISATEUR_CREATION,
        UTILISATEUR_MODIFICATION,
        DATE_CREATION,
        DATE_MODIFICATION
      FROM [Fournisseur]
      WHERE ID_FOURNISSEUR = @id
    `);
  return result.recordset[0];
}

async function createFournisseur(fournisseur) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('nom', sql.VarChar(50), fournisseur.NOM_FOURNISSEUR)
    .input('type', sql.VarChar(50), fournisseur.TYPE_FOURNISSEUR || null)
    .input('adresse', sql.VarChar(250), fournisseur.ADRESSE || null)
    .input('tele', sql.Int, parseInt(fournisseur.TELE) || null)
    .input('email', sql.VarChar(150), fournisseur.EMAIL || null)
    .input('createdBy', sql.VarChar(50), fournisseur.UTILISATEUR_CREATION || 'system')
    .query(`
      INSERT INTO [Fournisseur] (
        NOM_FOURNISSEUR, TYPE_FOURNISSEUR, ADRESSE, TELE, EMAIL, UTILISATEUR_CREATION, DATE_CREATION
      ) VALUES (
        @nom, @type, @adresse, @tele, @email, @createdBy, GETDATE()
      );
      SELECT SCOPE_IDENTITY() AS ID_FOURNISSEUR;
    `);
  return result.recordset[0].ID_FOURNISSEUR;
}

async function updateFournisseur(id, fournisseur) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', sql.Int, id)
    .input('nom', sql.VarChar(50), fournisseur.NOM_FOURNISSEUR)
    .input('type', sql.VarChar(50), fournisseur.TYPE_FOURNISSEUR || null)
    .input('adresse', sql.VarChar(250), fournisseur.ADRESSE || null)
    .input('tele', sql.Int, fournisseur.TELE || null)
    .input('email', sql.VarChar(150), fournisseur.EMAIL || null)
    .input('modifiedBy', sql.VarChar(50), fournisseur.UTILISATEUR_MODIFICATION || 'system')
    .query(`
      UPDATE [Fournisseur]
      SET
        NOM_FOURNISSEUR = @nom,
        TYPE_FOURNISSEUR = @type,
        ADRESSE = @adresse,
        TELE = @tele,
        EMAIL = @email,
        UTILISATEUR_MODIFICATION = @modifiedBy,
        DATE_MODIFICATION = GETDATE()
      WHERE ID_FOURNISSEUR = @id
    `);
  return result.rowsAffected[0];
}

async function deleteFournisseur(id) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', sql.Int, id)
    .query('DELETE FROM [Fournisseur] WHERE ID_FOURNISSEUR = @id');
  return result.rowsAffected[0];
}

module.exports = {
  getAllFournisseurs,
  getFournisseurById,
  createFournisseur,
  updateFournisseur,
  deleteFournisseur
}

