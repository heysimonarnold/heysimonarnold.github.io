const postcssPresetEnv = require("postcss-preset-env");
const postcssCustomMediaGenerator = require("postcss-custom-media-generator");

module.exports = {
  plugins: [
    require("postcss-mixins"),
    require("postcss-nested"),
    require("autoprefixer"),
  ],
};

module.exports = {
  plugins: [
    postcssCustomMediaGenerator({
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    }),
    postcssPresetEnv(),
    require("postcss-mixins"),
    require("postcss-nested"),
    require("autoprefixer"),
    require("postcss-custom-media"),
  ],
};
