const path = require('path');

// Configure full control mode + default control mode
// module.exports = (baseConfig, env, defaultConfig) => {
//   defaultConfig.module.rules.push({
//     // Add image file loader
//     test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
//     loader: require.resolve('url-loader')
//   });
// };

// Extend Mode
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "../")
      },
      {
        // Add image file loader
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: require.resolve('url-loader')
      }
    ]
  }
};

// Full Control Mode
// module.exports = (storybookBaseConfig, configType) => {
//   // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
//   // You can change the configuration based on that.
//   // 'PRODUCTION' is used when building the static version of storybook.

//   // Make whatever fine-grained changes you need
//   storybookBaseConfig.module.rules.push({
//     test: /\.scss$/,
//     loaders: ["style-loader", "css-loader", "sass-loader"],
//     include: path.resolve(__dirname, "../")
//   });

//   // Return the altered config
//   return storybookBaseConfig;
// };

