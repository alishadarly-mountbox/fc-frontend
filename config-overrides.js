// This file can be used with react-app-rewired if needed later
// For now, we're using standard React Scripts

module.exports = function override(config, env) {
  // Add polyfills for Node.js modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer'),
    vm: require.resolve('vm-browserify'),
    fs: false,
    path: false,
    os: false,
  };

  // Add Buffer polyfill
  config.plugins.push(
    new (require('webpack')).ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  );

  return config;
};
