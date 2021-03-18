// vue.config.js
module.exports = {
  // 选项...
  devServer: {
    host: 'localhost', // 前端服务器IP
    port: 3000, // 前端服务器端口号
    https: false,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws: true,
        pathRewrite: { '^/api': '/' }
      }
    } // 设置代理
  }
}
