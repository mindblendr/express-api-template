const jwt = require("jsonwebtoken");
const jwt_config = {
    algo: process.env.SESSION_ALGO || "HS256",
    secret: process.env.JWT_SECRET || "secret",
    ttl: parseInt(process.env.SESSION_EXP) || 3600
};

const encode = payload => {
    return jwt.sign(payload, jwt_config.secret, { expiresIn: jwt_config.ttl, algorithm: jwt_config.algo });
}

const decode = token => {
    return jwt.decode(token);
}

const verify = token => {
    return jwt.verify(token, jwt_config.secret);
}

module.exports = {
    encode,
    decode,
    verify
}