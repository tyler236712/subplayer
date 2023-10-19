const path = require('path');

module.exports = {
  entry: './src/index.ts', // Replace with your actual entry file
  devtool: 'inline-source-map', // This option is great for development, as it helps with debugging
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js', // The name of the file that will be created in "dist" directory
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Cleans the output directory before emit
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Replace with the directory where your index.html is located
    },
    compress: true,
    port: 9000, // You can specify another port here
  },
};
