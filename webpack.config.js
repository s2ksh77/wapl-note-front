const waplSDKConfig = require('@wapl/sdk/dist/webpack').module;
const path = require('path');

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
        },
      },
    },
  });
};
