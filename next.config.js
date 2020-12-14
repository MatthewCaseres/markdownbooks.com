module.exports = {
  // target: 'experimental-serverless-trace',
  webpack: (config, { isServer }) => {
    config.experiments = {
      topLevelAwait: true,
    };
    return config;
  },
};
