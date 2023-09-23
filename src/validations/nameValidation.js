import Joi from "joi";

const nameRules = Joi.string()
  .pattern(new RegExp(/^[A-Za-zÁÉÍÓÚáéíóúãõÃÕâêôÂÊÔ ]+$/))
  .max(30)
  .required()
  .messages({
    "object.regex": "Digite um nome válido",
    "string.pattern.base": "Digite um nome válido",
    "string.empty": "Digite um nome válido",
    "string.max": "O nome deve conter no máximo 30 caracteres",
  });

export { nameRules };
