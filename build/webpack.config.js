const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    mode: 'production',
    entry: {
        index: resolve('src/main.js')
    },
    output: {
        path: resolve('dist'),
        filename: 'dist.js'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': resolve('src')
        }
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                },
                exclude: resolve('node_modules')
            }
        ]
    }
};