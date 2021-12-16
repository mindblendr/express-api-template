module.exports = {
    algo: process.env.SESSION_ALGO || "HS256",
    secret: process.env.JWT_SECRET || "secret",
    ttl: parseInt(process.env.SESSION_EXP) || 3600
} 