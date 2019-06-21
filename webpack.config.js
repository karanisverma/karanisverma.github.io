
const path = require('path');

module.exports = {
  entry: ["./src/index.js", "./src/index.scss"],
  output: 
    {
    path: path.resolve(__dirname, 'build'), 
    filename: "[name].[contentHash].js"
    }
}