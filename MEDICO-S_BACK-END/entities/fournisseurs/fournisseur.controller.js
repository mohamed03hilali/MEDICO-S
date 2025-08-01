const Fournisseur = require('./fournisseur.model');
const { fournisseurSchema, fournisseurUpdateSchema } = require('./fournisseur.validate');

async function getAll(req, res) {
  try {
    const data = await Fournisseur.getAllFournisseurs();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function getById(req, res) {
  try {
    const fournisseur = await Fournisseur.getFournisseurById(req.params.id);
    if (!fournisseur) return res.status(404).json({ error: 'Fournisseur non trouvé' });
    res.json(fournisseur);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const { error } = fournisseurSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newId = await Fournisseur.createFournisseur(req.body);
    const created = await Fournisseur.getFournisseurById(newId);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const { error } = fournisseurUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const affected = await Fournisseur.updateFournisseur(req.params.id, req.body);
    if (affected === 0) return res.status(404).json({ error: 'Fournisseur non trouvé' });

    const updated = await Fournisseur.getFournisseurById(req.params.id);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const deleted = await Fournisseur.deleteFournisseur(req.params.id);
    if (deleted === 0) return res.status(404).json({ error: 'Fournisseur non trouvé' });
    res.status(204).end();
  } catch (err) {
    console.error(err);
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
