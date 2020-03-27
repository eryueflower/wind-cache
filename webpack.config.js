// var HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
module.exports = {
  mode: 'production', //development,production
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'library.js',
    library: 'winux',
    libraryTarget: 'umd'
    // filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    overlay: true,
    // contentBase: __dirname,
    port: 9000,
    inline: true,
    // 是否自动打开默认浏览器
    open: true
  },
  plugins: [
    new CleanWebpackPlugin() // 会默认清空 output.path 文件夹
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, 'src/index.html'),
    //   filename: 'index.html'
    // })
  ]
}
