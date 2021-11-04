const path = require('path')
const webpack = require('webpack')
const removeImports = require("next-remove-imports")()

module.exports = {
  experimental: {
    esmExternals: true
  },
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // env: { },
  // assetPrefix:  process.env.NODE_ENV === "production" ?'/' :'',
  // serverRuntimeConfig: {
  //   // Will only be available on the server side
  //   mySecret: 'secret',
  //   secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  // },
  // publicRuntimeConfig: {

  // },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  webpack: (config, { dev }) => {
    config.plugins.push(
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            React: 'react',
        })
    )
    return config
  },
  trailingSlash: true, //for exportPathMap
  exportPathMap: process.env.NODE_ENV === "production"
  ?async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    defaultPathMap['404'] = defaultPathMap['/_error']

    return defaultPathMap
    // return {
    //   '/': { page: '/' },
    //   '/about': { page: '/about' },
    // }
  }
  :null,
}