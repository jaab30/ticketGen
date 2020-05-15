const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/api', createProxyMiddleware({ target: 'https://tix-generator.herokuapp.com/', changeOrigin: true }));