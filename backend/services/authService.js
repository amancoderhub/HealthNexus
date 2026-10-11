const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PASSWORD_SALT_ROUNDS = 12;

const hashPassword = (password) => bcrypt.hash(password, PASSWORD_SALT_ROUNDS);

const verifyPassword = async (user, password) => {
    if (!user?.password) return false;

    if (user.password.startsWith("$2")) {
        return bcrypt.compare(password, user.password);
    }

    // Existing trainee-project accounts used plain-text passwords. Migrate on successful login.
    if (user.password !== password) return false;

    user.password = await hashPassword(password);
    await user.save();
    return true;
};

const createAccessToken = (user, role) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    return jwt.sign(
        { sub: user._id.toString(), role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "8h" }
    );
};

const createAuthResponse = (user, role) => ({
    token: createAccessToken(user, role),
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role,
    },
});

module.exports = { hashPassword, verifyPassword, createAuthResponse };
