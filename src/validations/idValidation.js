import Joi from 'joi';

const idRules = Joi.string()
    .pattern(new RegExp(/^[0-9a-fA-F]{24}$/))
    .required()
    .messages({
        'object.regex': 'Informe um id válido',
        'string.pattern.base': 'Informe um id válido',
        'string.empty': 'Informe um id válido',
    });

export default idRules;
