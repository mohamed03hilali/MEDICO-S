const Joi = require('joi');

const contactSchema = Joi.object({
  ID_FOURNISSEUR: Joi.number().required(),
  NOM_CONTACT: Joi.string().required(),
  PRENOM_CONTACT: Joi.string().required(),
  TELE: Joi.number().allow(null),
  EMAIL: Joi.string().email().allow(null),
  FONCTION: Joi.string().allow(null),
  UTILISATEUR_CREATION: Joi.string().required(),
});

const contactUpdateSchema = contactSchema.keys({
  UTILISATEUR_MODIFICATION: Joi.string().required()
});

module.exports = {
  contactSchema,
  contactUpdateSchema
};
