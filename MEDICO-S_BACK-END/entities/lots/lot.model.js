const { poolPromise, sql } = require('../../config/db');

async function getAllLots() {
  const pool = await poolPromise;
  const result = await pool.request().query(`
    SELECT * FROM [Lot]
  `);
  return result.recordset;
}

async function getLotById(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`SELECT * FROM [Lot] WHERE ID_LOT = @id`);
  return result.recordset[0];
}

async function createLot(lot) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('ID_FOURNISSEUR', sql.Int, lot.ID_FOURNISSEUR)
    .input('REFERENCE_LOT', sql.VarChar(50), lot.REFERENCE_LOT)
    .input('DATE_EXPIRATION', sql.DateTime, lot.DATE_EXPIRATION || null)
    .input('DATE_ENTRE_STOCK', sql.DateTime, lot.DATE_ENTRE_STOCK || null)
    .input('QUANTITE_INITIALE', sql.Int, lot.QUANTITE_INITIALE)
    .input('QUANTITE_DISPONIBLE', sql.Int, lot.QUANTITE_DISPONIBLE)
    .input('PRIX_UNITAIRE', sql.Decimal(10, 2), lot.PRIX_UNITAIRE)
    .input('PRIX_GLOBAL', sql.Decimal(10, 2), lot.PRIX_GLOBAL)
    .input('UTILISATEUR_CREATION', sql.VarChar(50), lot.UTILISATEUR_CREATION || 'system')
    .query(`
      INSERT INTO [Lot] (
        ID_FOURNISSEUR, REFERENCE_LOT, DATE_EXPIRATION, DATE_ENTRE_STOCK,
        QUANTITE_INITIALE, QUANTITE_DISPONIBLE, PRIX_UNITAIRE, PRIX_GLOBAL,
        UTILISATEUR_CREATION, DATE_CREATION
      ) VALUES (
        @ID_FOURNISSEUR, @REFERENCE_LOT, @DATE_EXPIRATION, @DATE_ENTRE_STOCK,
        @QUANTITE_INITIALE, @QUANTITE_DISPONIBLE, @PRIX_UNITAIRE, @PRIX_GLOBAL,
        @UTILISATEUR_CREATION, GETDATE()
      );
      SELECT SCOPE_IDENTITY() AS ID_LOT;
    `);
  return result.recordset[0].ID_LOT;
}

async function updateLot(id, lot) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('ID_LOT', sql.Int, id)
    .input('ID_FOURNISSEUR', sql.Int, lot.ID_FOURNISSEUR)
    .input('REFERENCE_LOT', sql.VarChar(50), lot.REFERENCE_LOT)
    .input('DATE_EXPIRATION', sql.DateTime, lot.DATE_EXPIRATION || null)
    .input('DATE_ENTRE_STOCK', sql.DateTime, lot.DATE_ENTRE_STOCK || null)
    .input('QUANTITE_INITIALE', sql.Int, lot.QUANTITE_INITIALE)
    .input('QUANTITE_DISPONIBLE', sql.Int, lot.QUANTITE_DISPONIBLE)
    .input('PRIX_UNITAIRE', sql.Decimal(10, 2), lot.PRIX_UNITAIRE)
    .input('PRIX_GLOBAL', sql.Decimal(10, 2), lot.PRIX_GLOBAL)
    .input('UTILISATEUR_MODIFICATION', sql.VarChar(50), lot.UTILISATEUR_MODIFICATION || 'system')
    .query(`
      UPDATE [Lot]
      SET
        ID_FOURNISSEUR = @ID_FOURNISSEUR,
        REFERENCE_LOT = @REFERENCE_LOT,
        DATE_EXPIRATION = @DATE_EXPIRATION,
        DATE_ENTRE_STOCK = @DATE_ENTRE_STOCK,
        QUANTITE_INITIALE = @QUANTITE_INITIALE,
        QUANTITE_DISPONIBLE = @QUANTITE_DISPONIBLE,
        PRIX_UNITAIRE = @PRIX_UNITAIRE,
        PRIX_GLOBAL = @PRIX_GLOBAL,
        UTILISATEUR_MODIFICATION = @UTILISATEUR_MODIFICATION,
        DATE_MODIFICATION = GETDATE()
      WHERE ID_LOT = @ID_LOT
    `);
  return result.rowsAffected[0];
}

async function deleteLot(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM [Lot] WHERE ID_LOT = @id');
  return result.rowsAffected[0];
}

module.exports = {
  getAllLots,
  getLotById,
  createLot,
  updateLot,
  deleteLot
};
