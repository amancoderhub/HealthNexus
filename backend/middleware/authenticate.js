const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Authentication is required." });
    }

    try {
        const token = authorization.slice(7);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.auth = { userId: payload.sub, role: payload.role };
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Your session is invalid or expired." });
    }
};

const authorizeRoles = (...allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.auth.role)) {
        return res.status(403).json({ success: false, message: "You do not have permission for this action." });
    }

    next();
};

module.exports = { authenticate, authorizeRoles };
