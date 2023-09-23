import mongoose, { Schema, model } from 'mongoose';
import Joi from 'joi';
import idRules from '../validations/idValidation';

const ReservationSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        travel: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Travels',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Reservation = model('Reservation', ReservationSchema);

const reservationRules = Joi.object({
    travel: idRules,
});

export { Reservation, reservationRules };
