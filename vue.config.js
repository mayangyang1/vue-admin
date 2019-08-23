const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: {
        // name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
}