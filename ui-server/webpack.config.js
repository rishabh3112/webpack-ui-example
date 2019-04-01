const {join} = require('path');
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "www.js",
        path: join(__dirname, "./bin")
    },
    mode: "production",
    node: {
        __dirname: false,
    },
    stats: "none",
    target: "node",
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}