import Joi from 'joi';

const numberRules = Joi.number().required().min(0).messages({
    'number.empty': 'Digite um valor válido',
    'number.any': 'Digite um valor válido',
    'number.min': 'O valor deve ser maior ou igual a 0',
});

export default numberRules;
