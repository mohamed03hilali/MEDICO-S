const Contact = require('./contacts.model');
const { contactSchema, contactUpdateSchema } = require('./contacts.validate');

async function getAll(req, res) {
  try {
    const data = await Contact.getAllContacts();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function getById(req, res) {
  try {
    const contact = await Contact.getContactById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact non trouvé' });
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newId = await Contact.createContact(req.body);
    const created = await Contact.getContactById(newId);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const affected = await Contact.updateContact(req.params.id, req.body);
    if (affected === 0) return res.status(404).json({ error: 'Contact non trouvé' });

    const updated = await Contact.getContactById(req.params.id);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const deleted = await Contact.deleteContact(req.params.id);
    if (deleted === 0) return res.status(404).json({ error: 'Contact non trouvé' });
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
