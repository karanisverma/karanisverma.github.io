const path = require("path")
const common = require('./webpack.config');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// var BrotliPlugin = require('brotli-webpack-plugin');

// const htmlWebpackMultiBuildPlugin = require('html-webpack-multi-build-plugin');
// const template = require.resolve('html-webpack-multi-build-plugin/template.ejs') 

module.exports = merge(common, { 
    mode : "production",
    devtool: 'none',
    output: { filename: "[name].[contentHash].js"},
    optimization:{
      minimizer:[
        new OptimizeCssAssetsPlugin(),
        new TerserPlugin(),
        new HtmlWebpackPlugin({ 
          template: "./src/index.html",
          minify:{
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true
          }
        }),
      ]
    },
    module: {
      rules: [
        {
          test: /\.(svg|png|jpg|gif)$/,
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
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
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
        }
      ]
    },
    plugins: [ 
      // new htmlWebpackMultiBuildPlugin(), // this plugin is for including module and nonmodule script
      new CleanWebpackPlugin(), // this plugin is for cleaning build files
      new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
      }), // this plugin is for extracting css files from js 
      new CompressionPlugin({
        filename: '[path]',
        algorithm: 'gzip',
        test: /\.(js|css|html|svg|ttf|woff|eot)$/,
      }),
      // this plugin for 
    //   new BrotliPlugin({
    //     asset: '[path].br',
    //     test: /\.(js|css|html|svg|ttf|woff|eot)$/,
    // })
    ]
  })