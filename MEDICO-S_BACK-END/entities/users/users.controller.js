const User = require('./users.model');
const { userSchema, userUpdateSchema } = require('./users.validate');

async function getAll(req, res) {
  try {
    const data = await User.getAllUsers();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getById(req, res) {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newId = await User.createUser(req.body);
    const created = await User.getUserById(newId);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const { error } = userUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const affected = await User.updateUser(req.params.id, req.body);
    if (affected === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    const updated = await User.getUserById(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const deleted = await User.deleteUser(req.params.id);
    if (deleted === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
