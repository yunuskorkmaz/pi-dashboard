const localtunnel = require('localtunnel');

(async () => {
    const tunnel = await localtunnel(80,{
        subdomain: 'yu-pi-tcp-22'
    })
    console.log(tunnel.url);

})()