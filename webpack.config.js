const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: { path: path.join(__dirname, './bin'), filename: 'app.js', libraryTarget: 'commonjs' },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current'
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  externals: ['chalk', 'inquirer', 'node-ssh'],
  plugins: [new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })]
}
