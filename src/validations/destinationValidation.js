import Joi from 'joi';

const destinationRules = Joi.string().max(50).required().messages({
    'string.empty': 'Digite um destino válido',
    'string.any': 'Digite um destino válido',
    'string.max': 'O destino deve conter no máximo 50 caracteres',
});

export default destinationRules;
