const webpack = require('webpack');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

/**
 * Config overrides.
 *
 * https://github.com/timarney/react-app-rewired#extended-configuration-options
 */
module.exports = (config, env) => {
  if (process.env.NODE_ENV !== 'production') {
    return config;
  }

  // prevent service worker from returning index page for nonexistent route
  // see https://github.com/facebook/create-react-app/issues/3299
  config.plugins = [
    ...config.plugins.filter(
      plugin => plugin.constructor.name !== 'SWPrecacheWebpackPlugin'
    ),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          return;
        }
        console.log(message); // eslint-disable-line no-console
      },
      minify: true,
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
  ];

  // do not bundle `react-hot-loader`
  config.plugins.push(new webpack.IgnorePlugin(/^react-hot-loader$/));

  return config;
};
