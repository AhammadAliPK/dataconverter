const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ogr2ogr = require("ogr2ogr");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(cors());

let users = {
  1: {
    id: "1",
    username: "Robin Wieruch",
  },
  2: {
    id: "2",
    username: "Dave Davids",
  },
};

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);

app.get("/url", (req, res, next) => {
  return res.send(Object.values(users));
});

app.post("/downloadfile", (req, response) => {
  const data = req.body;
  const newFileName = "data/shapefile.zip";
  fs.writeFile("data/myjsonfile.geojson", data.features, "utf8", function (
    res
  ) {
    var shapefile = ogr2ogr("data/myjsonfile.geojson")
      .project("EPSG:3857", "EPSG:3857")
      .format("ESRI Shapefile")
      .skipfailures()
      .stream();
    let stream = fs.createWriteStream(newFileName);
    shapefile.pipe(stream);
    stream.on("finish", () => {
      let responeText = {
        Success: true,
        Data: {
          fileCreated: true,
        },
      };

      response.send(JSON.stringify(responeText));
    });

    //responseFile("shapefilenew.zip", response);
  });

  // res.send("Book is added to the database");
});

app.get("/getData", (req, res, next) => {
  var shapefile = ogr2ogr("data/lay.geojson")
    .project("EPSG:3857", "EPSG:3857")
    .format("ESRI Shapefile")
    .skipfailures()
    .stream();
  shapefile.pipe(fs.createWriteStream("data/shapefile.zip"));
  return res.send(Object.values(users));
});

app.get("/download", (req, res, next) => {
  responseFile("shapefilenew.zip", res);
});

responseFile = (fileName, response) => {
  const filePath = "data/shapefile.zip";

  fs.exists(filePath, function (exists) {
    if (exists) {
      response.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment; filename=" + fileName,
      });

      fs.createReadStream(filePath).pipe(response);
      //response.send();
    } else {
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.end("ERROR File does not exist");
    }
  });
};
