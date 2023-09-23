import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);

const passwordRules = joiPassword
    .string()
    .min(8)
    .max(128)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required()
    .messages({
        'string.min': 'A senha deve conter no mínimo 8 caracteres',
        'string.max': 'A senha deve conter no máximo 128 caracteres',
        'password.minOfUppercase':
      'A senha deve conter no mínimo {#min} caracter maiúsculo',
        'password.minOfSpecialCharacters':
      'A senha deve conter no mínimo {#min} caracter especial',
        'password.minOfLowercase':
      'A senha deve conter no mínimo {#min} caracter minúsculo',
        'password.minOfNumeric':
      'A senha deve conter no mínimo {#min} caracter numérico',
        'password.noWhiteSpaces': 'A senha não pode conter espaços em branco',
        'string.empty': 'Digite uma senha válida',
    });

export default passwordRules;
