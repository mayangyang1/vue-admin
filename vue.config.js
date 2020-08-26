const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    
    productionSourceMap: false,
    devServer: {
        hot: true,
        port: 8080,
        // proxy: {
        //     '/api': {
        //         target: 'https://rltx2-yfb-gateway.rltx.com',
        //         changeOrigin: true,
        //         // ws: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         },
        //     }
        // },
        quiet: true,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*"
        },
        disableHostCheck: true,
        overlay: {
            warning: false,
            errors: false
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
    lintOnSave: false,
}