const Joi = require('joi');

const schema = Joi.object({
  ID_USER: Joi.number().integer().required(),
  ID_ROLE: Joi.number().integer().required()
});

function validateRoleUser(req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = {
  validateRoleUser
};
