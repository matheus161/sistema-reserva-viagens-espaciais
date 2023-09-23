import { Schema, model } from 'mongoose';
import Joi from 'joi';
import destinationRules from '../validations/destinationValidation';
import dateRules from '../validations/dateValidation';
import numberRules from '../validations/numberValidation';
import timeRules from '../validations/timeValidation';

const TravelsSchema = new Schema(
    {
        destination: {
            type: String,
            required: true,
        },

        date: {
            type: String,
            required: true,
        },

        departureTime: {
            type: String,
            required: true,
        },

        arrivalTime: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        availableSeatsNumber: {
            type: Number,
            required: true,
        },

        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Travels = model('Travels', TravelsSchema);

const travelsRules = Joi.object({
    destination: destinationRules,
    date: dateRules,
    departureTime: timeRules,
    arrivalTime: timeRules,
    price: numberRules,
    availableSeatsNumber: numberRules,
});

export { Travels, travelsRules };
