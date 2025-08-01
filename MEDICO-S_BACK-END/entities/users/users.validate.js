const Joi = require('joi');

const userSchema = Joi.object({
  USER_LOGIN: Joi.string().required(),
  NOM_USER: Joi.string().required(),
  PRENOM_USER: Joi.string().required(),
  EMAIL: Joi.string().email().allow(null),
  MDP: Joi.string().required(),
  FONCTION: Joi.string().allow(null),
  ACTIF: Joi.boolean().required(),
  UTILISATEUR_CREATION: Joi.string().required()
});

const userUpdateSchema = userSchema.keys({
  UTILISATEUR_MODIFICATION: Joi.string().required()
});

module.exports = {
  userSchema,
  userUpdateSchema
};
