  express = require("express"),
  app = express(),
  server = require("http").Server(app),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 5000;

app.use(bodyParser.json());



app.post("/examineImage", function(req, resp) {
  var imageURL = req.body.imageRequested;
  console.log("Response was ", imageURL);
 
});

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

app.get(/^(.+)$/, function(req, res) {
  res.sendFile(__dirname + "/public/" + req.params[0]);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

server.listen(port, function() {
  console.log("Listening on " + port);
});