const Joi = require("joi");

const validateLoginObject = (dataToValidate) => {
    return Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
        .options({ stripUnknown: true })
        .validate(dataToValidate);
};

module.exports = { validateLoginObject };
