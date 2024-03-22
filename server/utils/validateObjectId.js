const Joi = require("joi");
const { ObjectId } = require("mongoose").Types;

const validateObjectId = (id) => {
    return Joi.string()
        .custom((value, helpers) => {
            const isValidId = ObjectId.isValid(value);
            return isValidId ? value : helpers.error("any.invalid");
        }, "objectid")
        .required()
        .validate(id);
};

module.exports = { validateObjectId };
