import pkg from 'jsonwebtoken';

const { verify } = pkg;

async function ensureAuthenticate(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            status: 'error',
            message: 'Sem Token',
        });
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = verify(token, process.env.SECRET);
        const { id } = data;

        req.userId = id;

        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') res.status(401).json({ message: 'Token expirado' });

        return res.status(500).json({
            status: 'error',
            message: `Internal server error - ${error.message}.`,
        });
    }
}

export default ensureAuthenticate;
