import Joi from 'joi';

const options = {
    errors: {
        wrap: {
            label: '',
        },
    },
};

export const validateSignUp = (userData: any) => {
    const schema = Joi.object({
        id: Joi.string()
            .guid({ version: 'uuidv4' })
            .optional()
            .messages({ 'string.guid': 'User ID must be in UUID format' }),
        email: Joi.string().email().required().messages({
            'string.email': 'Email format is invalid',
            'any.required': 'Email is required',
        }),
        password: Joi.string()
            .min(8)
            .pattern(
                new RegExp(
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).+$',
                ),
            )
            .required()
            .messages({
                'string.min': 'Password must have at least 8 characters.',
                'string.pattern.base':
                    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                'any.required': 'Password is required.',
            }),
        salt: Joi.string().required().messages({
            'any.required': 'Salt is required',
        }),
    });

    return schema.validate(userData, options);
};

export const validateSignIn = (userData: any) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Email format is invalid',
            'any.required': 'Email is required',
        }),
        password: Joi.string().required(),
    });

    return schema.validate(userData, options);
};
