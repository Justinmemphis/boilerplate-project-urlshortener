const express = require('express');
const cors = require('cors');
const app = express();

let mongoose;
try {
  mongoose = require('mongoose');
} catch (e) {
  console.log(e);
}
const AutoIncrement = require("mongoose-sequence")(mongoose);
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");
const router = express.Router();

const enableCORS = function (req, res, next) {
  if (!process.env.DISABLE_XORIGIN) {
    const allowedOrigins = ["https://www.freecodecamp.org"];
    const origin = req.headers.origin;
    if (!process.env.XORIGIN_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      console.log(req.method);
      res.set({
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      });
    }
  }
  next();
};

const TIMEOUT = 10000;

// enable bodyParser
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

router.get("/file/*?", function (req, res, next) {
  if (req.params[0] === ".env") {
    return next({ status: 401, message: "ACCESS DENIED" });
  }
  fs.readFile(path.join(__dirname, req.params[0]), function (err, data) {
    if (err) {
      return next(err);
    }
    res.type("txt").send(data.toString());
  });
});

router.get("/is-mongoose-ok", function (req, res) {
  if (mongoose) {
    res.json({ isMongooseOk: !!mongoose.connection.readyState });
  } else {
    res.json({ isMongooseOk: false });
  }
});

const Url = require("./myApp.js").UrlModel;

router.use(function (req, res, next) {
  if (req.method !== "OPTIONS" && Url.modelName !== "Url") {
    return next({ message: "URL Model is not correct" });
  }
  next();
});

router.post("/mongoose-model", function (req, res, next) {
  // try to create a new instance based on their model
  // verify it's correctly defined in some way
  let u;
  u = new Url(req.body);
  res.json(u);
});

// list out functions
const createUrl = require("./myApp.js").createAndSaveUrl;
router.get("/create-and-save-url", function (req, res, next) {
  let t = setTimeout(() => {
    next({ message: "timeout" });
  }, TIMEOUT);
  createUrl(function (err, data) {
    clearTimeout(t);
    if (err) {
      return next(err);
    }
    if (!data) {
      console.log("missing `done()` argument");
      return next({ message: "Missing callback argument" });
    }
    Url.findById(data._id, function (err, url) {
      if (err) {
        return next(err);
      }
      res.json(url);
    });
  });
});

const findById = require("./myApp.js").findUrlById;
router.get("/find-by-id", function (req, res, next) {
  let t = setTimeout(() => {
    next({ message: "timeout" });
  }, TIMEOUT);
  let u = new Url({ original_url: "https://www.google.com"});
  u.save(function (err, url) {
    if (err) {
      return next(err);
    }
    findById(url._id, function (err, data) {
      clearTimeout(t);
      if (err) {
        return next(err);
      }
      if (!data) {
        console.log("Missing `done()` argument");
        return next({ message: "Missing callback argument" });
      }
      res.json(data);
    });
  });
});

// main post argument
router.post("/shorturl", (req, res) => {
  console.log(req.body);
});

app.use("/api", enableCORS, router);

// Error handler
app.use(function (err, req, res, next) {
  if (err) {
    res
      .status(err.status || 500)
      .type("txt")
      .send(err.message || "SERVER ERROR");
  }
});

// Unmatched routes handler
app.use(function (req, res) {
  if (req.method.toLowerCase() === "options") {
    res.end();
  } else {
    res.status(404).type("txt").send("Not Found");
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
