import Joi from "joi";

const validationSchema = Joi.object({
    name: Joi.string().min(2).max(150).required().messages({
        "string.base": "Name must be a text.",
        "string.empty": "Name is required.",
        "string.min": "Name must be at least 2 characters.",
        "string.max": "Name cannot exceed 150 characters.",
    }),
    description: Joi.string().min(2).max(150).required().messages({
        "string.base": "Description must be a text.",
        "string.empty": "Description is required.",
        "string.min": "Description must be at least 2 characters.",
        "string.max": "Description cannot exceed 150 characters.",
    }),
    image: Joi.any().required().messages({
        "string.empty": "File is required.",
    }),
});

export default validationSchema;
