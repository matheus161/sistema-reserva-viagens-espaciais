import { Reservation } from '../models/Reservation';
import { Travels } from '../models/Travels';
import pagination from '../utils/PaginationUtils';

async function create(req, res) {
    try {
        const { userId } = req;
        const travel = await Travels.findById(req.body.travel);
        if (!travel) {
            return res.status(404).json({ message: 'Viagem não encontrada' });
        }

        if (travel.availableSeatsNumber === 0) {
            return res
                .status(404)
                .json({ message: 'Não há mais assentos disponíveis para essa viagem' });
        }

        const reservations = await Reservation.find({
            user: userId,
            travel: req.body.travel,
        });
        if (reservations.length === 2) {
            return res
                .status(400)
                .json({ message: 'Limite máximo de reservas atingido.' });
        }

        const reservation = await Reservation.create({
            user: userId,
            travel: req.body.travel,
        });

        await travel.updateOne({
            availableSeatsNumber: travel.availableSeatsNumber - 1,
        });

        return res.status(201).json(reservation);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

async function getAll(req, res) {
    try {
        const reservations = await Reservation.find().populate(['user', 'travel']);

        const limit = parseInt(req.query.limit, 10) || 5;
        const page = parseInt(req.query.page, 10) || 0;

        const { paginatedResults, totalItems, totalPages } = pagination(
            reservations,
            page,
            limit
        );

        return res.status(200).json({
            results: paginatedResults,
            totalItems,
            totalPages,
        });
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

async function getAllByUser(req, res) {
    try {
        const { userId } = req;
        const reservations = await Reservation.find({ user: userId }).populate([
            'user',
            'travel',
        ]);

        const limit = parseInt(req.query.limit, 10) || 5;
        const page = parseInt(req.query.page, 10) || 0;

        const { paginatedResults, totalItems, totalPages } = pagination(
            reservations,
            page,
            limit
        );

        return res.status(200).json({
            results: paginatedResults,
            totalItems,
            totalPages,
        });
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

async function getAllByUserAndTravel(req, res) {
    try {
        const { userId } = req;
        const { id } = req.params;
        const reservations = await Reservation.find({
            user: userId,
            travel: id,
        }).populate(['user', 'travel']);

        return res.status(200).json(reservations);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

async function update(req, res) {
    try {
        const { userId } = req;
        const { id } = req.params;

        const reservation = await Reservation.findById(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reserva não encontrada' });
        }

        const travel = await Travels.findById(req.body.travel);
        if (!travel) {
            return res.status(404).json({ message: 'Viagem não encontrada' });
        }

        if (travel.availableSeatsNumber === 0) {
            return res
                .status(404)
                .json({ message: 'Não há mais assentos disponíveis para essa viagem' });
        }

        const reservations = await Reservation.find({
            user: userId,
            travel: req.body.travel,
        });
        if (reservations.length === 2) {
            return res
                .status(400)
                .json({ message: 'Limite máximo de reservas atingido.' });
        }

        await reservation.updateOne({
            travel: req.body.travel,
        });

        await travel.updateOne({
            availableSeatsNumber: travel.availableSeatsNumber - 1,
        });

        return res.status(200).json('Troca de passagem efetuada com sucesso.');
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

export default {
    create, getAll, getAllByUser, getAllByUserAndTravel, update
};
