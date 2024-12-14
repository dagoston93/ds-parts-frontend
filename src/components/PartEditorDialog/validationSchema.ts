import Joi from "joi";

const validationSchema = Joi.object({
    name: Joi.string().min(2).max(255).required().messages({
        "string.base": "Name must be a text.",
        "string.empty": "Name is required.",
        "string.min": "Name must be at least 2 characters.",
        "string.max": "Name cannot exceed 255 characters.",
    }),
    category: Joi.string().required().messages({
        "string.empty": "Category is required.",
    }),
    manufacturer: Joi.string().required().messages({
        "string.empty": "Manufacturer is required.",
    }),
    partPackage: Joi.string().required().messages({
        "string.empty": "Package is required.",
    }),
    price: Joi.number().greater(0).required().messages({
        "number.base": "Price must be a number.",
        "number.greater": "Price must be greater than 0.",
        "any.required": "Price is required.",
    }),
    count: Joi.number().integer().min(0).required().messages({
        "number.base": "Count must be a number.",
        "number.integer": "Count must be a whole number.",
        "number.min": "Count must be 0 or more.",
        "any.required": "Count is required.",
    }),
});

export default validationSchema;