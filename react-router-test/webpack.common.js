
const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const appDir = fs.realpathSync(process.cwd())

const resolveApp = relativePath => path.resolve(appDir, relativePath)

const srcDir = resolveApp('./src')
const distDir = resolveApp('./dist')

console.log(srcDir)

const entry = {
  app: `${srcDir}/index.js`
}

const outputPath = distDir
const outputPublicPath = '/'
const htmlWebpackPlugins = [
  new HtmlWebpackPlugin({
    template: `index.html`,
    filename: 'index.html',
    inject: 'body'
  })
]

const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/

module.exports = {
  entry: entry,
  output: {
    path: outputPath,
    publicPath: outputPublicPath,
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].js'
  },
  stats: {
    children: false,
    chunks: false,
    modules: false
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            include: srcDir,
            loader: 'babel-loader'
          },
          /* css */
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('autoprefixer')
                  ]
                }
              }
            ]
          },
        ]
      }
    ]
  },
  plugins: [
    ...htmlWebpackPlugins
  ]
}
