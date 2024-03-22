const Joi = require("joi");

exports.validateBlogObject = async (dataToValidate) => {
    return Joi.object({
        title: Joi.string().required().messages({
            "any.required": "Blog title is required",
            "string.base": "Blog title must be a string",
            "string.empty": "Blog title is required",
        }),
        content: Joi.string().required().messages({
            "any.required": "Blog content is required",
            "string.base": "Blog content must be a string",
            "string.empty": "Blog content is required",
        }),
    })
        .options({ stripUnknown: true })
        .validate(dataToValidate);
};
