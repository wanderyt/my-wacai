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
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
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
      },
      // {
      //   test: /\.(js|mjs|jsx|ts|tsx)$/,
      //   include: path.resolve(__dirname, "../"),
      //   loader: require.resolve('babel-loader'),
      //   options: {
      //     customize: require.resolve(
      //       'babel-preset-react-app/webpack-overrides'
      //     ),
      //     plugins: [
      //       [
      //         require.resolve('babel-plugin-named-asset-import'),
      //         {
      //           loaderMap: {
      //             svg: {
      //               ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
      //             },
      //           },
      //         },
      //       ],
      //     ],
      //     // This is a feature of `babel-loader` for webpack (not Babel itself).
      //     // It enables caching results in ./node_modules/.cache/babel-loader/
      //     // directory for faster rebuilds.
      //     cacheDirectory: true,
      //     cacheCompression: false,
      //     compact: false,
      //   },
      // },
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
        exclude: /node_modules/,
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

