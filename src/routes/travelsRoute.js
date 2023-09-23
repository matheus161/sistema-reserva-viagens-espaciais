import { Router } from 'express';
import TravelsController from '../controllers/TravelsController';
import limitRequests from '../middlewares/limitRequests';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';
import ensureManager from '../middlewares/ensureManager';
import validate from '../middlewares/validate';
import { travelsRules } from '../models/Travels';
import verifyId from '../middlewares/verifyId';

const router = Router();

router.use(limitRequests.slightly);

router.post(
    '/',
    limitRequests.heavily,
    ensureAuthenticate,
    ensureManager,
    validate(travelsRules),
    TravelsController.create
);

router.get('/available', ensureAuthenticate, TravelsController.getAllAvailable);

router.get('/', ensureAuthenticate, ensureManager, TravelsController.getAll);

router.get('/:id', ensureAuthenticate, verifyId, TravelsController.getById);

router.put(
    '/:id',
    ensureAuthenticate,
    ensureManager,
    verifyId,
    validate(travelsRules),
    TravelsController.update
);

router.delete(
    '/:id',
    ensureAuthenticate,
    ensureManager,
    verifyId,
    TravelsController.remove
);

export default { router, name: '/travels' };
