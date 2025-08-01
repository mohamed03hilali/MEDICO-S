const Medicament = require('./medicament.model');
const { medicamentSchema, medicamentUpdateSchema } = require('./medicament.validate');

async function getAll(req, res) {
  try {
    const data = await Medicament.getAllMedicaments();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getById(req, res) {
  try {
    const medicament = await Medicament.getMedicamentById(req.params.id);
    if (!medicament) return res.status(404).json({ error: 'Médicament non trouvé' });
    res.json(medicament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const { error } = medicamentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newId = await Medicament.createMedicament(req.body);
    const created = await Medicament.getMedicamentById(newId);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const { error } = medicamentUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const affected = await Medicament.updateMedicament(req.params.id, req.body);
    if (affected === 0) return res.status(404).json({ error: 'Médicament non trouvé' });

    const updated = await Medicament.getMedicamentById(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const deleted = await Medicament.deleteMedicament(req.params.id);
    if (deleted === 0) return res.status(404).json({ error: 'Médicament non trouvé' });
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
