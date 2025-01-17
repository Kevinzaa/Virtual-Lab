const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('db');
defaultConfig.resolver.sourceExts.push('mjs', 'cjs');

defaultConfig.resolver.nodeModulesPaths.push(
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../../node_modules')
);

module.exports = defaultConfig;