const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_BASE_URL,
      changeOrigin: true,
      credentials: true,
      secure: process.env.REACT_APP_ENVIRONMENT === 'production',
      pathRewrite: {
        '^/api': ''
      }
    })
  );
};