/* eslint-disable @typescript-eslint/no-var-requires */
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const withSourceMaps = require('@zeit/next-source-maps')

const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
} = process.env

process.env.SENTRY_DSN = SENTRY_DSN

module.exports = withSourceMaps({
  experimental: {
    optionalCatchAll: true,
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    if (
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      NODE_ENV === 'production'
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          urlPrefix: '~/_next',
          release: options.buildId,
        })
      )
    }

    return config
  },
})