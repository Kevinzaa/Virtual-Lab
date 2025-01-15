// babel.config.js
module.exports = function (api) {
    api.cache(true);
    return {
      presets: ["babel-preset-expo"],
    };
  };
  
// module.exports = function () {
//   return {
//       // These presets are used together to allow you to write modern,
//       // React code that will be compatible with many browsers.
//     presets: ["module:metro-react-native-babel-preset", { jsxImportSource: "nativewind" }],
//     // plugins: ["nativewind/babel"],
//   };
// };