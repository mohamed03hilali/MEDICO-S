const { poolPromise, TYPES } = require('../config/db');

/**
 * Exécute une requête SQL avec ou sans paramètres
 * @param {string} query - La requête SQL
 * @param {Array} [params] - Tableau d’objets { name, type, value }
 * @returns {Promise<Array>} - Résultat sous forme de recordset
 */
async function executeQuery(query, params = []) {
  try {
    const pool = await poolPromise;
    const request = pool.request();

    // Ajout des paramètres si présents
    params.forEach(param => {
      request.input(param.name, param.type, param.value);
    });

    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    console.error('SQL Error:', err);
    throw err;
  }
}

// ✅ Export direct de la fonction
module.exports = executeQuery;
