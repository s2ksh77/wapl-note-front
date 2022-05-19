/* eslint-disable new-cap */
const waplSDKConfig = require('@wapl/sdk/dist/webpack').module;
const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = (webpackConfigEnv, argv) => {
  return new waplSDKConfig({
    webpackConfigEnv,
    argv,
    /**
     * ---------------------------------
     * 추가적인 웹팩 설정은 다음 필드를 사용해주세요.
     * ---------------------------------
     */
    additionalWebpackConfig: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
          '@mcomponents': path.resolve(__dirname, 'src/mobile/components'),
          '@mstyles': path.resolve(__dirname, 'src/mobile/styles'),
          '@mhooks': path.resolve(__dirname, 'src/mobile/hooks'),
          '@mconstant': path.resolve(__dirname, 'src/mobile/constant'),
        },
      },
      plugins: [new NodePolyfillPlugin()],
      devServer: {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
      },
    },
  });
};
