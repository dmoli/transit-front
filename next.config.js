/**
 * Limpia la caché del archivo node_modules/.cache babel-loader
 * esto permite cambiar el archivo "env-config" y que los cambios se muestren de inmediato
 *
 * https://github.com/zeit/next.js/tree/master/examples/with-universal-configuration
 */
module.exports = {
  webpack: (config, { dev, useFileSystemPublicRoutes }) => {
    // config.useFileSystemPublicRoutes = false;
    useFileSystemPublicRoutes = false

    // Perform customizations to config
    config.module.rules = config.module.rules.map(rule => {
      if(rule.loader === 'babel-loader') {
        rule.options.cacheDirectory = false
      }
      return rule
    })

    // plugins
    // https://github.com/zeit/next.js/issues/1195
    config.plugins = config.plugins.filter((plugin) => {
      if (plugin.constructor.name === 'UglifyJsPlugin') {
        return false
      } else {
        return true
      }
    })

    // para soportar la imagen de "powered by Google"
    // https://github.com/kenny-hibino/react-places-autocomplete/issues/119
    config.module.rules.push({
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {}
        }
      ]
    })

    // Important: return the modified config
    return config
  }
}

// useFileSystemPublicRoutes: false,
