const { createProxyMiddleware } = require('http-proxy-middleware')
console.log(2222)
module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://localhost:3001/',
    changeOrigin: true,
    pathRewrite: {"^/api": ""}
  }))
}
