import Joi from 'joi';

const emailRules = Joi.string().email().required().messages({
    'string.email': 'Digite um email válido',
    'string.empty': 'Digite um email válido',
    'string.any': 'Digite um email válido',
});

export default emailRules;
