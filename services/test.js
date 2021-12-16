const router = require('express').Router();
const auth = require('../middlewares/auth');
router.get('/', [auth], async (req, res) => {
    try {
        return res.send({ status: 1 });
    } catch (error) {
        return res.send({
            data: error,
            status: 0
        });
    }
});

module.exports = {
    router,
    prefix: '/test'
}