const Joi = require('joi');

const fournisseurSchema = Joi.object({
  NOM_FOURNISSEUR: Joi.string().required(),
  TYPE_FOURNISSEUR: Joi.string().allow(null),
  ADRESSE: Joi.string().allow(null),
  TELE: Joi.string().pattern(/^\d{10}$/).allow(null),
  EMAIL: Joi.string().email().allow(null),
  UTILISATEUR_CREATION: Joi.string().required()
});

const fournisseurUpdateSchema = fournisseurSchema.keys({
  UTILISATEUR_MODIFICATION: Joi.string().required()
});

module.exports = {
  fournisseurSchema,
  fournisseurUpdateSchema
};
