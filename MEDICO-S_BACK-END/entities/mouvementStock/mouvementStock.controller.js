const Model = require('./mouvementStock.model');
const { schema, updateSchema } = require('./mouvementStock.validate');

async function getAll(req, res) {
  try {
    const data = await Model.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getById(req, res) {
  try {
    const item = await Model.getById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Mouvement non trouvé' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newId = await Model.create(req.body);
    const created = await Model.getById(newId);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const { error } = updateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const affected = await Model.update(req.params.id, req.body);
    if (affected === 0) return res.status(404).json({ error: 'Mouvement non trouvé' });

    const updated = await Model.getById(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const deleted = await Model.remove(req.params.id);
    if (deleted === 0) return res.status(404).json({ error: 'Mouvement non trouvé' });
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
