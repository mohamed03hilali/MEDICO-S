const { TYPES } = require('../../config/db');
const executeQuery = require('../../utils/sql');

async function getAllContacts() {
  const query = `
    SELECT
      ID_CONTACT,
      ID_FOURNISSEUR,
      NOM_CONTACT,
      PRENOM_CONTACT,
      TELE,
      EMAIL,
      FONCTION,
      UTILISATEUR_CREATION,
      UTILISATEUR_MODIFICATION,
      DATE_CREATION,
      DATE_MODIFICATION
    FROM [Contact]
  `;
  return await executeQuery(query);
}

async function getContactById(id) {
  const query = `
    SELECT
      ID_CONTACT,
      ID_FOURNISSEUR,
      NOM_CONTACT,
      PRENOM_CONTACT,
      TELE,
      EMAIL,
      FONCTION,
      UTILISATEUR_CREATION,
      UTILISATEUR_MODIFICATION,
      DATE_CREATION,
      DATE_MODIFICATION
    FROM [Contact]
    WHERE ID_CONTACT = @id
  `;

  const params = [{ name: 'id', type: TYPES.Int, value: id }];
  const result = await executeQuery(query, params);
  return result[0] || null;
}

async function createContact(contact) {
  const query = `
    INSERT INTO [Contact] (
      ID_FOURNISSEUR, NOM_CONTACT, PRENOM_CONTACT, TELE, EMAIL, FONCTION, UTILISATEUR_CREATION, DATE_CREATION
    ) VALUES (
      @fournisseurId, @nom, @prenom, @tele, @email, @fonction, @createdBy, GETDATE()
    );
    SELECT SCOPE_IDENTITY() AS ID_CONTACT;
  `;

  const params = [
    { name: 'fournisseurId', type: TYPES.Int, value: contact.ID_FOURNISSEUR },
    { name: 'nom', type: TYPES.VarChar, value: contact.NOM_CONTACT },
    { name: 'prenom', type: TYPES.VarChar, value: contact.PRENOM_CONTACT },
    { name: 'tele', type: TYPES.Int, value: contact.TELE || null },
    { name: 'email', type: TYPES.VarChar, value: contact.EMAIL || null },
    { name: 'fonction', type: TYPES.VarChar, value: contact.FONCTION || null },
    { name: 'createdBy', type: TYPES.VarChar, value: contact.UTILISATEUR_CREATION || 'system' }
  ];

  const result = await executeQuery(query, params);
  return result[0]?.ID_CONTACT || null;
}

async function updateContact(id, contact) {
  const query = `
    UPDATE [Contact]
    SET
      ID_FOURNISSEUR = @fournisseurId,
      NOM_CONTACT = @nom,
      PRENOM_CONTACT = @prenom,
      TELE = @tele,
      EMAIL = @email,
      FONCTION = @fonction,
      UTILISATEUR_MODIFICATION = @modifiedBy,
      DATE_MODIFICATION = GETDATE()
    WHERE ID_CONTACT = @id
  `;

  const params = [
    { name: 'id', type: TYPES.Int, value: id },
    { name: 'fournisseurId', type: TYPES.Int, value: contact.ID_FOURNISSEUR },
    { name: 'nom', type: TYPES.VarChar, value: contact.NOM_CONTACT },
    { name: 'prenom', type: TYPES.VarChar, value: contact.PRENOM_CONTACT },
    { name: 'tele', type: TYPES.Int, value: contact.TELE || null },
    { name: 'email', type: TYPES.VarChar, value: contact.EMAIL || null },
    { name: 'fonction', type: TYPES.VarChar, value: contact.FONCTION || null },
    { name: 'modifiedBy', type: TYPES.VarChar, value: contact.UTILISATEUR_MODIFICATION || 'system' }
  ];

  return await executeQuery(query, params);
}

async function deleteContact(id) {
  const query = `
    DELETE FROM [Contact]
    WHERE ID_CONTACT = @id
  `;

  const params = [{ name: 'id', type: TYPES.Int, value: id }];
  return await executeQuery(query, params);
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
