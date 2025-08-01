const Joi = require('joi');

const typeSchema = Joi.object({
  NOM: Joi.string().required(),
  DESCRIPTION: Joi.string().allow(null),
  UTILISATEUR_CREATION: Joi.string().required()
});

const typeUpdateSchema = typeSchema.keys({
  UTILISATEUR_MODIFICATION: Joi.string().required()
});

module.exports = {
  typeSchema,
  typeUpdateSchema
};
