const Joi = require("joi");

const validateRegisterObject = (dataToValidate) => {
    return Joi.object({
        name: Joi.string().required().messages({
            "string.base": "Name must be a string",
            "string.empty": "Name is required",
            "any.required": "Name is required",
        }),
        email: Joi.string().email().required().messages({
            "string.base": "Provide a valid e-mail",
            "string.email": "Provide a valid e-mail",
            "string.empty": "E-Mail is required",
            "any.required": "E-Mail is required.",
        }),
        password: Joi.string().required().messages({
            "string.base": "Password must be a string",
            "string.empty": "Password is required",
            "any.required": "Password is required.",
        }),
    })
        .options({ stripUnknown: true })
        .validate(dataToValidate);
};

module.exports = { validateRegisterObject };
