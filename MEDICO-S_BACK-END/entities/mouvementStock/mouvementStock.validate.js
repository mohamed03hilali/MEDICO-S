const Joi = require('joi');

const schema = Joi.object({
  ID_TYPE_ST: Joi.number().integer().required(),
  ID_PRODUIT: Joi.number().integer().required(),
  QUANTITE: Joi.number().integer().required(),
  DATE_MOUVEMENT: Joi.date().required(),
  UTILISATEUR_CREATION: Joi.string().required()
});

const updateSchema = schema.keys({
  UTILISATEUR_MODIFICATION: Joi.string().required()
});

module.exports = {
  schema,
  updateSchema
};
