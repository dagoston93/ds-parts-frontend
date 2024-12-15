import Joi from "joi";

const validationSchema = Joi.object({
    name: Joi.string().min(2).max(150).required().messages({
        "string.base": "Name must be a text.",
        "string.empty": "Name is required.",
        "string.min": "Name must be at least 2 characters.",
        "string.max": "Name cannot exceed 150 characters.",
    }),
});

export default validationSchema;
