const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './src/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../dist/example'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: {
            modules: true,
          }}
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: './index.html'
    })
  ]
}
