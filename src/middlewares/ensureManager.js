import { User } from '../models/User';

async function ensureManager(req, res, next) {
    const { userId } = req;

    const user = await User.findById(userId);

    if (!user.isManager) {
        return res.status(401).json({
            status: 'error',
            message: "User isn't admin.",
        });
    }

    return next();
}

export default ensureManager;
