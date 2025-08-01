const { poolPromise, sql } = require('../../config/db');

async function getAll() {
  const pool = await poolPromise;
  const result = await pool.request().query(`SELECT * FROM Mouvement_Stock`);
  return result.recordset;
}

async function getById(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`SELECT * FROM Mouvement_Stock WHERE ID_MOUVEMENT = @id`);
  return result.recordset[0];
}

async function create(data) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('ID_TYPE_ST', sql.Int, data.ID_TYPE_ST)
    .input('ID_PRODUIT', sql.Int, data.ID_PRODUIT)
    .input('QUANTITE', sql.Int, data.QUANTITE)
    .input('DATE_MOUVEMENT', sql.DateTime, data.DATE_MOUVEMENT)
    .input('UTILISATEUR_CREATION', sql.VarChar(50), data.UTILISATEUR_CREATION || 'system')
    .query(`
      INSERT INTO Mouvement_Stock (
        ID_TYPE_ST, ID_PRODUIT, QUANTITE, DATE_MOUVEMENT,
        UTILISATEUR_CREATION, DATE_CREATION
      ) VALUES (
        @ID_TYPE_ST, @ID_PRODUIT, @QUANTITE, @DATE_MOUVEMENT,
        @UTILISATEUR_CREATION, GETDATE()
      );
      SELECT SCOPE_IDENTITY() AS ID_MOUVEMENT;
    `);
  return result.recordset[0].ID_MOUVEMENT;
}

async function update(id, data) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('ID_MOUVEMENT', sql.Int, id)
    .input('ID_TYPE_ST', sql.Int, data.ID_TYPE_ST)
    .input('ID_PRODUIT', sql.Int, data.ID_PRODUIT)
    .input('QUANTITE', sql.Int, data.QUANTITE)
    .input('DATE_MOUVEMENT', sql.DateTime, data.DATE_MOUVEMENT)
    .input('UTILISATEUR_MODIFICATION', sql.VarChar(50), data.UTILISATEUR_MODIFICATION || 'system')
    .query(`
      UPDATE Mouvement_Stock
      SET
        ID_TYPE_ST = @ID_TYPE_ST,
        ID_PRODUIT = @ID_PRODUIT,
        QUANTITE = @QUANTITE,
        DATE_MOUVEMENT = @DATE_MOUVEMENT,
        UTILISATEUR_MODIFICATION = @UTILISATEUR_MODIFICATION,
        DATE_MODIFICATION = GETDATE()
      WHERE ID_MOUVEMENT = @ID_MOUVEMENT
    `);
  return result.rowsAffected[0];
}

async function remove(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Mouvement_Stock WHERE ID_MOUVEMENT = @id');
  return result.rowsAffected[0];
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
