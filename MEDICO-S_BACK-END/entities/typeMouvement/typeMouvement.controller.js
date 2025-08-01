const Type = require('./typeMouvement.model');
const { typeSchema, typeUpdateSchema } = require('./typeMouvement.validate');

async function getAll(req, res) {
  try {
    const data = await Type.getAllTypes();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getById(req, res) {
  try {
    const type = await Type.getTypeById(req.params.id);
    if (!type) return res.status(404).json({ error: 'Type de mouvement non trouvé' });
    res.json(type);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const { error } = typeSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newId = await Type.createType(req.body);
    const created = await Type.getTypeById(newId);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const { error } = typeUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const affected = await Type.updateType(req.params.id, req.body);
    if (affected === 0) return res.status(404).json({ error: 'Type non trouvé' });

    const updated = await Type.getTypeById(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const deleted = await Type.deleteType(req.params.id);
    if (deleted === 0) return res.status(404).json({ error: 'Type non trouvé' });
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
