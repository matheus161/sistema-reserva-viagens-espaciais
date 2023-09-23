import Joi from 'joi';

const dateRules = Joi.string()
    .pattern(new RegExp(/^\d{2}[./]\d{2}[./]\d{4}$/))
    .max(10)
    .required()
    .messages({
        'object.regex': 'Digite uma data válida',
        'string.pattern.base': 'Digite uma data válida',
        'string.empty': 'Digite uma data válida',
        'string.max': 'A data deve conter no máximo 10 caracteres',
    });

export default dateRules;
