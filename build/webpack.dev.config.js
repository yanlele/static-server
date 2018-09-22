const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),

    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: '/\.js$/',
                use: {
                    loader: 'babel',
                },
                include: path.join(__dirname, 'src')
            }
        ]
    }
};