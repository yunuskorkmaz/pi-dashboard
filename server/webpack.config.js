const path = require('path');

module.exports = {
    entry : './server.js',
    target: 'node',
    mode: 'production',
    output: {
        filename: 'server.js',
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, 'build')
    }
}