import { Router } from 'express';
import ReservationController from '../controllers/ReservationController';
import limitRequests from '../middlewares/limitRequests';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';
import ensureManager from '../middlewares/ensureManager';
import validate from '../middlewares/validate';
import { reservationRules } from '../models/Reservation';
import verifyId from '../middlewares/verifyId';

const router = Router();

router.post(
    '/',
    limitRequests.heavily,
    ensureAuthenticate,
    validate(reservationRules),
    ReservationController.create
);

router.get(
    '/',
    limitRequests.slightly,
    ensureAuthenticate,
    ensureManager,
    ReservationController.getAll
);

router.get(
    '/user',
    limitRequests.slightly,
    ensureAuthenticate,
    ReservationController.getAllByUser
);

router.get(
    '/:id',
    limitRequests.slightly,
    ensureAuthenticate,
    verifyId,
    ReservationController.getAllByUserAndTravel
);

router.put(
    '/:id',
    limitRequests.heavily,
    ensureAuthenticate,
    validate(reservationRules),
    verifyId,
    ReservationController.update
);

router.delete(
    '/:id',
    limitRequests.heavily,
    ensureAuthenticate,
    verifyId,
    ReservationController.remove
);

export default { router, name: '/reservation' };
