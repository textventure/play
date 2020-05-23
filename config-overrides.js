const webpack = require('webpack');

/**
 * Config overrides.
 *
 * https://github.com/timarney/react-app-rewired#extended-configuration-options
 */
module.exports = (config, env) => {
  if (process.env.NODE_ENV !== 'production') {
    return config;
  }

  // do not bundle `react-hot-loader`
  config.plugins.push(new webpack.IgnorePlugin(/^react-hot-loader$/));

  return config;
};
