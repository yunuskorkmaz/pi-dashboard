const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const si = require("systeminformation");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// eslint-disable-next-line no-unused-vars
io.on('connection', (socket) => {
  console.log('a user connected');
});

app.use(bodyParser.json());

app.use(cors());


app.get("/info", (req, res) => {
  si.get({
    baseboard: "manufacturer, model",
    cpu: "manufacturer, brand, speed, cores",
    osInfo: "distro,kernel",
    time: 'uptime'
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.send(err));
});

app.get("/currentLoad", (req, res) => {
  si.get({
    cpuTemperature: "*",
    mem: "total, used, free",
    currentLoad: "currentload ",
    fsSize: '*',
    networkStats: '*'
  }).then((data) => {

    res.json( {
      ...data
    });
  })
});

app.get("/allDynamic", (req, res) => {
  si.getDynamicData().then((result) => {
    res.json(result);
  });
});

const port = 5000;
server.listen(port, () => {
  console.log("app runngin on " + port);
});
