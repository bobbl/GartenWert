const vue_config = require('./src/customize/vue_config.js');

module.exports = { 
    runtimeCompiler: true,
    publicPath: '',
    pwa: {
        name: vue_config.pwa_name,
        themeColor: vue_config.pwa_color,
    }
}
