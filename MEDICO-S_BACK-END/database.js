require('dotenv').config();
const sql = require('mssql');

const config = {
    server: 'MOHAMED', // Utilisez seulement le nom de l'ordinateur
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: true,
        trustServerCertificate: true,
        instanceName: 'SQLEXPRESS', // Ajoutez cette ligne
    },
    authentication: {
        type: 'ntlm',
        options: {
            domain: '', // facultatif, à remplir si votre réseau a un domaine
            userName: '', // vide pour utiliser l'utilisateur Windows courant
            password: '', // vide pour utiliser l'utilisateur Windows courant
        }
    }
};

async function connectToDatabase() {
    try {
        const pool = await sql.connect(config);
        console.log('Connexion réussie à la base de données');
        return pool;
    } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
        throw err;
    }
}

module.exports = connectToDatabase;
