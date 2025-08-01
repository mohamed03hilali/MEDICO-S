const Joi = require('joi');

const lotSchema = Joi.object({
  ID_FOURNISSEUR: Joi.number().required(),
  REFERENCE_LOT: Joi.string().required(),
  DATE_EXPIRATION: Joi.date().allow(null),
  DATE_ENTRE_STOCK: Joi.date().allow(null),
  QUANTITE_INITIALE: Joi.number().required(),
  QUANTITE_DISPONIBLE: Joi.number().required(),
  PRIX_UNITAIRE: Joi.number().precision(2).required(),
  PRIX_GLOBAL: Joi.number().precision(2).required(),
  UTILISATEUR_CREATION: Joi.string().required()
});

const lotUpdateSchema = lotSchema.keys({
  UTILISATEUR_MODIFICATION: Joi.string().required()
});

module.exports = {
  lotSchema,
  lotUpdateSchema
};
