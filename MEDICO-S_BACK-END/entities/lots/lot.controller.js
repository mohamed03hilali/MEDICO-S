const Lot = require('./lot.model');
const { lotSchema, lotUpdateSchema } = require('./lot.validate');

async function getAll(req, res) {
  try {
    const data = await Lot.getAllLots();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getById(req, res) {
  try {
    const lot = await Lot.getLotById(req.params.id);
    if (!lot) return res.status(404).json({ error: 'Lot non trouvé' });
    res.json(lot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const { error } = lotSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newId = await Lot.createLot(req.body);
    const created = await Lot.getLotById(newId);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const { error } = lotUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const affected = await Lot.updateLot(req.params.id, req.body);
    if (affected === 0) return res.status(404).json({ error: 'Lot non trouvé' });

    const updated = await Lot.getLotById(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const deleted = await Lot.deleteLot(req.params.id);
    if (deleted === 0) return res.status(404).json({ error: 'Lot non trouvé' });
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
