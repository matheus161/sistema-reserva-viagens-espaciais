import { Schema, model } from 'mongoose';
import Joi from 'joi';
import PasswordUtils from '../utils/PasswordUtils';
import nameRules from '../validations/nameValidation';
import emailRules from '../validations/emailValidation';
import passwordRules from '../validations/passValidation';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 40,
            select: false,
        },

        isManager: {
            type: Boolean,
            default: false,
        },
    },

    { timeStamps: true, discriminatorKey: 'role' }
);

// eslint-disable-next-line func-names
UserSchema.pre('save', async function (next) {
    this.password = await PasswordUtils.encrypt(this.password);
    next();
});

const User = model('User', UserSchema);

const userRules = Joi.object({
    name: nameRules,
    email: emailRules,
    password: passwordRules,
});

const authRules = Joi.object({
    email: emailRules,
    password: passwordRules,
});

export { User, userRules, authRules };
