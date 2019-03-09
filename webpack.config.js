const path = require('path')

module.exports = {
  entry: './src/components/Cache/Cache.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    libraryTarget: 'commonjs2',
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
}
