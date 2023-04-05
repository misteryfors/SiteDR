const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/',
        createProxyMiddleware({
            target: 'https://master43.ru',
            changeOrigin: true,
            secure: false
        })
    );
};