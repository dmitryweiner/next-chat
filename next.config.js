module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = config.watchOptions || {};
    config.watchOptions.ignored = [
      // Don't watch _any_ files for changes
      /.*/,
    ];
    return config;
  },
};
