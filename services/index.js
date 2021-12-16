const path = require('path');
const services_path = './';
const middlewares_path = '../middlewares/';
const dir = require('fs').readdirSync(__dirname + path.sep);

module.exports = (app) => {
    dir.forEach(function (filename) {
        if (path.extname(filename) === '.js' && filename !== 'index.js') {
            var { prefix, router, middlewares } = require(services_path + filename);
            prefix = prefix || '/';
            if (middlewares) {
                middlewares.forEach(middleware => {
                    try {
                        _middleware = require(middlewares_path + middleware);
                        if (_middleware) app.use(prefix, _middleware);
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
            app.use(prefix, router);
        }
    });
}