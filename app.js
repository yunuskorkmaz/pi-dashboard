require('custom-env').env(true);

require('./services/ngrok-service')

console.log(process.env.TEST);