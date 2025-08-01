const Joi = require('joi');

const roleSchema = Joi.object({
  NOM_ROLE: Joi.string().required(),
  DESCRIPTION: Joi.string().allow(null),
  UTILISATEUR_CREATION: Joi.string().required()
});

const roleUpdateSchema = roleSchema.keys({
  UTILISATEUR_MODIFICATION: Joi.string().required()
});

module.exports = {
  roleSchema,
  roleUpdateSchema
};
