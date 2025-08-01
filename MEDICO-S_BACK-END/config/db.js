// config/db.js
const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER || 'localhost\\SQLEXPRESS',
  database: process.env.DB_NAME || 'MEDICO_DB',
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USER || 'medico_user',
      password: process.env.DB_PASSWORD || 'your_password_here'
    }
  },
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true', // 'true' ou 'false' dans .env
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true' // idem
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Connexion SQL établie');
    return pool;
  })
  .catch(err => {
    console.error('❌ Erreur de connexion SQL :', err.message);
  });

module.exports = {
  sql,
  poolPromise,
  TYPES: sql
};
