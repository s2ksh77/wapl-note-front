const waplSDKConfig = require("@wapl/sdk/dist/webpack").module;

module.exports = (webpackConfigEnv, argv) => {
  return new waplSDKConfig({
    webpackConfigEnv,
    argv,
    /**
     * ---------------------------------
     * 추가적인 웹팩 설정은 다음 필드를 사용해주세요.
     * ---------------------------------
     */
    additionalWebpackConfig: {},
  });
};
