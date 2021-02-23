/* eslint-disable react-hooks/rules-of-hooks */
const { override, fixBabelImports, addLessLoader, addWebpackPlugin, useEslintRc } = require('customize-cra')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

module.exports = override(
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: true,
  }),
  useEslintRc(),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#CE201F' },
    },
  })
)
