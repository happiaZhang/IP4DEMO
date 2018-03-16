const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OUTPUT_PATH = path.resolve(__dirname, './app/public/');
const vendor = require('./vendor');
const isProd = process.env.NODE_ENV === 'production';
const genHtmlTemplate = (dir, chunks, filename) => {
  if (!filename) filename = 'index';
  return new HtmlWebpackPlugin({
    template: dir,
    filename: isProd ? `../view/${filename}.html` : `${filename}.html`,
    inject: 'body',
    chunks,
    showErrors: false,
    minify: {
      removeComments: isProd,
      collapseWhitespace: isProd
    }
  });
};

const opt = {
  entry: {
    vendor,
    app: './app/web/index'
  },
  output: {
    path: OUTPUT_PATH,
    filename: isProd ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    publicPath: isProd ? '/public/' : '/'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: isProd
              }
            }, {
              loader: 'postcss-loader'
            }, {
              loader: 'less-loader'
            }
          ]
        })
      }, {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'image/[name].[ext]',
            limit: 1024
          }
        },
        exclude: /node_modules/
      }
    ]
  }
};

if (!isProd) {
  opt.devtool = 'eval-source-map';
  opt.devServer = {
    contentBase: OUTPUT_PATH,
    port: 3000,
    inline: true,
    hot: true,
    historyApiFallback: {
      rewrites: [
        {from: /^\/*$/, to: '/index.html'}
      ]
    },
    proxy: {
      '/api': 'http://127.0.0.1:7001'
    }
  };
}

const _plugin = [
  new CleanWebpackPlugin(['app/public']),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(isProd ? 'production' : 'development')
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  genHtmlTemplate('./app/web/templates/index.ejs', ['app', 'vendor', 'manifest']),
  new ExtractTextPlugin(isProd ? 'css/[name].[chunkhash].css' : 'css/[name].css'),
  new webpack.HashedModuleIdsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
    minChunks: 2
  }),
  new ImageminPlugin({
    pngquant: {
      quality: '95-100'
    }
  })
];

if (isProd) {
  _plugin.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }));
} else {
  _plugin.push(new webpack.HotModuleReplacementPlugin());
}

opt.plugins = _plugin;

module.exports = opt;
