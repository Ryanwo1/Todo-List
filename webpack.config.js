const path = require('path');
let mode =  'development';

if (process.env.NODE_ENV === 'production') {
    mode = "production";
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8080,
    open: {
        app: {
          name: 'google-chrome',
        },
      },
  },
  mode: mode};