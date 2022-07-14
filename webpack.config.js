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
            use: [{
              loader: MiniCssExtractPlugin.loader,
              options:  {publicPath: ""},
          }, "css-loader",],
        },
        {
           test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
           type: "asset/resource",
        }
    ],
    },
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: "[name][ext]",
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