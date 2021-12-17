const router = require('express').Router();
const User = require('../models/User');
const Session = require('../models/Session');
const bcrypt = require('bcrypt');
const jwt = require('../bin/jwt');
const auth = require('../middlewares/auth');
const auth_admin = require('../middlewares/auth_admin');

router.get('/', [auth_admin], async (req, res) => {
    try {
        let users = await User.paginate({ type: 'user' }, { page: req.query.page, perPage: req.query.perPage });
        return res.send(users);
    } catch (error) {
        console.log(error);
    }

    return res.status(401).send({ status: 0 });
});

router.get('/:id', [auth_admin], async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        return res.send(user);
    } catch (error) {
        console.log(error);
    }

    return res.status(401).send({ status: 0 });
});

router.put('/:id', [auth_admin], async (req, res) => {
    try {
        let { password, firstname, lastname } = req.body;
        let updates = { password, firstname, lastname };
        if (password) {
            updates.password = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
        }
        let user = await User.findByIdAndUpdate(req.params.id, updates, {new: true});
        return res.send(user);
    } catch (error) {
        console.log(error);
    }

    return res.status(401).send({ status: 0 });
});

router.post('/create', [auth_admin], async (req, res) => {
    try {
        let { username, password, firstname, lastname, type } = req.body;
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(12));

        const user = await User.create({ username, password, type, firstname, lastname });

        return res.status(201).send({ username, password, firstname, lastname, type });

    } catch (error) {
        console.log(error);
    }

    return res.status(500).send({ status: 0 });
});

router.post('/register', async (req, res) => {
    try {
        let { username, password, firstname, lastname } = req.body;
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(12));

        const user = await User.create({ username, password, firstname, lastname });

        return res.status(201).send({ username, password, firstname, lastname });

    } catch (error) {
        console.log(error);
    }

    return res.status(500).send({ status: 0 });
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        let login = await User.findOne({ username });

        if (login && bcrypt.compareSync(password, login.password)) {
            const { id, username, status, type } = login;
            const login_data = { id, username, status, type };
            const token = jwt.encode(login_data);
            login_data['token'] = token;
            await Session.create(login_data);
            return res.send({ token });
        }
    } catch (error) {
        console.log(error);
    }

    return res.status(401).send({ status: 0 });
});

router.get('/me', [auth], async (req, res) => {
    try {
        let user = await User.findById(req.user_data.id);
        return res.send(user);
    } catch (error) {
        console.log(error);
    }

    return res.status(401).send({ status: 0 });
});

router.get('/logout', [auth], async (req, res) => {
    try {
        let session = await Session.findByIdAndDelete(req.user_data._id);
        return res.send(session);
    } catch (error) {
        console.log(error);
    }

    return res.status(401).send({ status: 0 });
});

module.exports = {
    router,
    prefix: '/user'
}