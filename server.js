const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes/routes.js')
const path = require('path')
const bodyParser = require("body-parser")

// enable bodyParser
app.use(bodyParser.urlencoded({ extended: "false" }))
app.use(bodyParser.json())

app.use(routes)
app.use('/public', express.static(`${process.cwd()}/public`))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Error Handler - 404
app.use(function (req, res) {
  if (req.method.toLowerCase() === "options") {
    res.end()
  } else {
    res.status(404).type("txt").send("Not Found")
  }
});

// Error handler - 500
app.use(function (err, req, res, next) {
  if (err) {
    res
      .status(err.status || 500)
      .type("txt")
      .send(err.message || "SERVER ERROR");
  }
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
})

app.use(cors());

/*

let mongoose;
try {
  mongoose = require('mongoose');
} catch (e) {
  console.log(e);
};

mongoose.set('useFindAndModify', false);

const AutoIncrement = require("mongoose-sequence")(mongoose);
const fs = require('fs');
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


// Basic Configuration








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

const UrlModel = require("./myApp.js").UrlModel;

router.use(function (req, res, next) {
  if (req.method !== "OPTIONS" && UrlModel.modelName !== "UrlModel") {
    return next({ message: "URL Model is not correct" });
  }
  next();
});

router.post("/mongoose-model", function (req, res, next) {
  // try to create a new instance based on their model
  // verify it's correctly defined in some way
  let u;
  u = new UrlModel(req.body);
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
    UrlModel.findById(data._id, function (err, url) {
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
  let u = new UrlModel({ original_url: "https://www.google.com"});
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
  var long_url = req.body.url;
  //console.log(long_url);
  //module.exports.long_url = long_url;
  const REPLACE_REGEX = /^https?:\/\//i

  const urlOne = long_url.replace(REPLACE_REGEX, '');
  //console.log("after urlOne long_url is now: " + long_url);

  dns.lookup(urlOne, function onLookup(err, address, family) {
    if (err == null) {
      console.log("No errors: " + err + " - " + address + " - " + family);
      createUrl(
        { _id: req.body.id },
        { $push: { original_url: long_url } },
        function (err, data) {
        clearTimeout(t);
      if (err) {
        return next(err);
      }
      if (!data) {
        console.log("missing `done()` argument");
        return next({ message: "Missing callback argument" });
      }
      UrlModel.findById(data._id, function (err, url) {
        if (err) {
          return next(err);
        }
      res.json(url);
      });
  });
    } else {
      res.json({ error: 'invalid url' });
    }
  });
  //res.json({ long_url });
});

app.use("/api", enableCORS, router);



// Your first API endpoint - test endpoint
router.get('/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

*/
