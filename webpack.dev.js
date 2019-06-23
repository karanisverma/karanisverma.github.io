const path = require("path")
const common = require('./webpack.config');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common ,{ 
    mode : "development",
    devtool: "cheap-eval-source-map",
    output: { filename: "[name].js"},
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
          ]
        },
        {
          test: /\.(svg|png|jpg|gif|pdf)$/,
          use: { 
            loader: "file-loader",
            options: { 
            name: "[name].[hash].[ext]",
            outputPath: "images" 
            }
          }
        },
        {
          test: /\.html$/,
          use: ["html-loader"] 
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ 
        template: "./src/index.html"
      })
    ]
  })