const ngrok = require('ngrok');

let status = "not-started";

ngrok.connect({
    addr: 80,
    bind_tls: false,
    proto: 'http',
    name:'default',
}).then((value) => {
    status = "started";
    console.log(status)
})



module.exports = { ngrok }