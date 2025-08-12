const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Exclude large model files from build
      webpackConfig.module.rules.push({
        test: /\.(bin|shard1|shard2|json)$/,
        type: 'asset/resource',
        exclude: /node_modules/,
      });

      // Optimize memory usage
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        splitChunks: {
          chunks: 'all',
          maxSize: 244000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };

      // Increase memory limit
      webpackConfig.performance = {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      };

      return webpackConfig;
    },
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        vm: require.resolve('vm-browserify'),
        fs: false,
        path: false,
        os: false,
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  },
};
