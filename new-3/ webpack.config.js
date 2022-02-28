const path = require('path');

module.exports = {
  entry: './src/pollingWorker.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  "plugins": ["transform-remove-console"]
};