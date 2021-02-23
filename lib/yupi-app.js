

var app = require('./App');
var Events = require('events');

exports = module.exports = createApplication;

function createApplication() {
    
    app.init();

    app.set('events',new Events.EventEmitter())

    return app;
}