import { Travels } from '../models/Travels';
import pagination from '../utils/PaginationUtils';

async function create(req, res) {
    try {
        const travel = await Travels.create(req.body);

        return res.status(201).json(travel);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

async function getAllAvailable(req, res) {
    try {
        const travels = await Travels.find({ isAvailable: true });

        const limit = parseInt(req.query.limit, 10) || 5;
        const page = parseInt(req.query.page, 10) || 0;

        const { paginatedResults, totalItems, totalPages } = pagination(
            travels,
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

async function getAll(req, res) {
    try {
        const travels = await Travels.find();

        const limit = parseInt(req.query.limit, 10) || 5;
        const page = parseInt(req.query.page, 10) || 0;

        const { paginatedResults, totalItems, totalPages } = pagination(
            travels,
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

async function getById(req, res) {
    try {
        const travel = await Travels.findById(req.params.id);

        return res.status(200).json(travel);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

async function update(req, res) {
    try {
        const { body } = req;

        const travel = await Travels.findByIdAndUpdate(req.params.id, body, {
            new: true,
        });

        if (!travel) {
            return res.status(404).json({ message: 'Viagem não encontrada' });
        }

        return res.status(200).json(travel);
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;

        const travel = await Travels.findById(id);
        if (!travel) {
            return res.status(404).json({ message: 'Viagem não encontrada' });
        }

        await travel.updateOne({
            isAvailable: false,
        });

        return res.status(204).json();
    } catch ({ message }) {
        return res.status(500).json({ message });
    }
}

export default {
    create,
    getAllAvailable,
    getAll,
    getById,
    update,
    remove,
};
