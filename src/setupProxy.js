const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'http://3.15.28.195:15355/',
      target: 'http://pixbrand.agency:15355/',
      changeOrigin: true,
    })
  );
};