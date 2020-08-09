const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/chat/',
    createProxyMiddleware({
      target: 'ws://localhost:8080',
      changeOrigin: true,
      ws: true
    })
  );
};