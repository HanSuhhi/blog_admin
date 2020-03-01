module.exports = {
  //runtimeCompiler: true,
  //publicPath: '/', // 设置打包文件相对路径
  devServer: {
    port: 8090,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', //对应自己的接口
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }, 
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()
  }
}