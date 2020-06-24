const Clarifai = require('clarifai');
  express = require("express"),
  app = express(),
  server = require("http").Server(app),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 5000;

app.use(bodyParser.json());
const clar = new Clarifai.App({apiKey: '6ec8e86dba384fc3bd1544b79bb01854'});


app.post("/examineImage", function(req, resp) {
  var imageURL = req.body.imageRequested;
  console.log("Response was ", imageURL);
  
  //const imageBytes = fs.readFileSync(imageURL);

  clar.models.predict(Clarifai.GENERAL_MODEL, imageURL)
     .then(response => {
      const resString = JSON.stringify(response); 
      const parseData = JSON.parse(resString);
      const nama = parseData.outputs[0].data.concepts
  
      var namaCetak = nama.map(function(nam) {
        return nam.name
      })
  
      console.log(namaCetak);
      resp.send(namaCetak);
     
   })
     .catch(err => {
       console.log(err);
    });
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