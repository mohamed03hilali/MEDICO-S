const roleUserModel = require('./roleUser.model');

async function getAll(req, res) {
  try {
    const data = await roleUserModel.getAllRoleUsers();
    res.json(data);
  } catch (err) {
    console.error('Erreur SQL:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des rôles utilisateurs' });
  }
}

async function getByUserId(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID utilisateur invalide' });

  try {
    const data = await roleUserModel.getRolesByUserId(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des rôles' });
  }
}

async function create(req, res) {
  try {
    await roleUserModel.addRoleToUser(req.body);
    res.status(201).json({ message: 'Rôle ajouté à l’utilisateur' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l’ajout du rôle' });
  }
}

async function remove(req, res) {
  const idUser = parseInt(req.params.ID_USER);
  const idRole = parseInt(req.params.ID_ROLE);
  if (isNaN(idUser) || isNaN(idRole)) {
    return res.status(400).json({ error: 'Paramètres invalides' });
  }

  try {
    await roleUserModel.removeRoleFromUser(idUser, idRole);
    res.json({ message: 'Rôle retiré de l’utilisateur' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression du rôle' });
  }
}

module.exports = {
  getAll,
  getByUserId,
  create,
  remove
};
