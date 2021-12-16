const jwt = require('../bin/jwt');
const Session = require('../models/Session');

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (authorization) {
            var token = authorization.split(' ');
            if (token.length == 2 && token[0] == 'Bearer') {
                const decoded = jwt.decode(token[1]);
                req.user_data = await Session.findOne({id: decoded.id, token: token[1]});
                if (req.user_data && req.user_data.type === 'user') {
                    return next();
                }
            }
        }
    } catch (error) {
        return res.status(401).send({error: 'Unauthorized!'});
    }
    return res.status(401).send({error: 'Unauthorized!'});
}