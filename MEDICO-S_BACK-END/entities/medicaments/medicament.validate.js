const Joi = require('joi');

const medicamentSchema = Joi.object({
  ID_TYPE_MEDICAMENT: Joi.number().required(),
  FORME: Joi.string().allow(null),
  NOM_TYPE: Joi.string().allow(null),
  DOSAGE: Joi.string().allow(null),
  CODE_BARRE: Joi.string().allow(null),
  DESCRIPTION: Joi.string().allow(null),
  NOM_SOCIETE: Joi.string().allow(null),
  UTILISATEUR_CREATION: Joi.string().required()
});

const medicamentUpdateSchema = medicamentSchema.keys({
  UTILISATEUR_MODIFICATION: Joi.string().required()
});

module.exports = {
  medicamentSchema,
  medicamentUpdateSchema
};
