const express = require("express"),
  server = express(),
  socketIO = require("socket.io"),
  bodyParser = require("body-parser");

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// PORT && connection
const PORT = process.env.PORT || 3001;
const app = server.listen(PORT, () =>
  console.log(`listenning to port ${PORT}...`)
);

// socket.io
const io = socketIO.listen(app);

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Object variables
const sensor = {
  mode: 0,
  isOn: 0,
  infrared: 0,
  light: 0,
  isAutoInfraredSensor: true,
  isAutoIntensitySensor: true
};

const statusCallback = body => {
  sensor.isOn = body.isOn;
  sensor.infrared = body.infrared;
  sensor.light = body.light;

  io.sockets.emit("new-state", sensor);
};

const modeCallback = body => {
  sensor.mode = body.mode;
  sensor.isAutoInfraredSensor = body.isAutoInfraredSensor;
  sensor.isAutoIntensitySensor = body.isAutoIntensitySensor;
};

// APIs

// server.get("/", (req, res) => {
//   res.send("Hi!");
// });

// for the front end to get the information to display
server.get("/api/sensor", (req, res) => {
  res.send(sensor);
});

// for the nodeMCU to update the status of the sensors
server.post("/api/sensor", (req, res) => {
  statusCallback(req.body);
  res.send(sensor);
});

// for the front end to set the mode
server.post("/api/sensor/mode", (req, res) => {
  modeCallback(req.body);
  res.send(sensor);
});

io.on("connection", client => {
  console.log("user connected");

  // client disconnects
  client.on("disconnect", () => {
    console.log("user disconnected");
  });

  // send message to every client that connect (realtime)
  client.on("sent-message", message => {
    io.sockets.emit("new-message", message);
  });
});

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // lide our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", () => (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
