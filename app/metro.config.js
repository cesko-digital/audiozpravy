// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// workaround for latest apollo 
// https://github.com/apollographql/apollo-client/releases/tag/v3.5.4
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = defaultConfig;
