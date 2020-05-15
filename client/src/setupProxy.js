const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({ target: 'https://tix-generator.herokuapp.com/', changeOrigin: true }));

}