const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    // El token normalmente viene así: "Bearer eyJhbGciOiJIUzI1NiIs..."
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Token no proporcionado');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Token inválido o expirado');
        }
        req.user = user; // Guarda los datos del token para usarlos después
        next(); // Continúa con la siguiente función (la ruta protegida)
    });
}

module.exports = authenticateToken;
