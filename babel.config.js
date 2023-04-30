module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          "root": [
            "."
          ],
          "extensions": [
            ".ts",
            ".tsx"
          ]
        }
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: 'react-native-dotenv',
        },
      ],
      '@babel/plugin-proposal-export-namespace-from',
    ],
  };
};
