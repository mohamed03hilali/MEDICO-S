const express = require('express');
const router = express.Router();
const controller = require('./roleUser.controller');
const { validateRoleUser } = require('./roleUser.validate');

// GET tous les rôles utilisateurs
router.get('/', controller.getAll);

// GET rôles d’un utilisateur
router.get('/:id', controller.getByUserId);

// POST ajouter un rôle à un utilisateur
router.post('/', validateRoleUser, controller.create);

// DELETE retirer un rôle
router.delete('/:ID_USER/:ID_ROLE', controller.remove);

module.exports = router;
