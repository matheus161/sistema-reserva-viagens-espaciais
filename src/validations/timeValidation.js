import Joi from 'joi';

const timeRules = Joi.string()
    .pattern(new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/))
    .max(50)
    .required()
    .messages({
        'object.regex': 'Digite um horário válido',
        'string.pattern.base': 'Digite um horário válido',
        'string.empty': 'Digite um horário válido',
        'string.any': 'Digite um horário válido',
        'string.max': 'O horário deve conter no máximo 5 caracteres',
    });

export default timeRules;
