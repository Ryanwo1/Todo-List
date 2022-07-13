const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
let mode =  'development';

if (process.env.NODE_ENV === 'production') {
    mode = "production";
}

module.exports = {
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        }
    ],
    },
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    clean: true,
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({
    template: "./src/index.html",
  })],
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    hot: true,
    port: 8080,
    open: {
        app: {
          name: 'google-chrome',
        },
      },
  },
  mode: mode};