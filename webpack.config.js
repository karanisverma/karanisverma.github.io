
const path = require('path');

module.exports = {
  entry: ["./src/index.js", "./src/index.scss"],
  output: 
    {
    filename: "[name].[contentHash].js"
    }
}