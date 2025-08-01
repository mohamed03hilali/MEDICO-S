const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Import des routes
const contactRoutes = require('./entities/contacts/contacts.routes');
const fournisseurRoutes = require('./entities/fournisseurs/fournisseur.routes');
const typeMouvementRoutes = require('./entities/typeMouvement/typeMouvement.routes');
const mouvementStockRoutes = require('./entities/mouvementStock/mouvementStock.routes');
const userRoutes = require('./entities/users/users.routes');
const roleRoutes = require('./entities/roles/role.routes');
const roleUserRoutes = require('./entities/roleUser/roleUser.routes');
const lotRoutes = require('./entities/lots/lot.routes');
const medicamentRoutes = require('./entities/medicaments/medicament.routes');
const typeMedicamentRoutes = require('./entities/typeMedicament/typeMedicament.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes API
app.use('/api/contacts', contactRoutes);
app.use('/api/fournisseurs', fournisseurRoutes);
app.use('/api/types-mouvement', typeMouvementRoutes);
app.use('/api/mouvements-stock', mouvementStockRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/role-users', roleUserRoutes);
app.use('/api/lots', lotRoutes);
app.use('/api/medicaments', medicamentRoutes);
app.use('/api/type-medicaments', typeMedicamentRoutes);

// Route d’accueil
app.get('/', (req, res) => {
  res.send('📦 API Stock Pharma — Backend opérationnel');
});

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
