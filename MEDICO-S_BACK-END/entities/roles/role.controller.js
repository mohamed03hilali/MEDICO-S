const Role = require('./role.model');
const { roleSchema, roleUpdateSchema } = require('./role.validate');

async function getAll(req, res) {
  try {
    const data = await Role.getAllRoles();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getById(req, res) {
  try {
    const role = await Role.getRoleById(req.params.id);
    if (!role) return res.status(404).json({ error: 'Rôle non trouvé' });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const { error } = roleSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newId = await Role.createRole(req.body);
    const created = await Role.getRoleById(newId);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const { error } = roleUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const affected = await Role.updateRole(req.params.id, req.body);
    if (affected === 0) return res.status(404).json({ error: 'Rôle non trouvé' });

    const updated = await Role.getRoleById(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const deleted = await Role.deleteRole(req.params.id);
    if (deleted === 0) return res.status(404).json({ error: 'Rôle non trouvé' });
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
