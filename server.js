require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require("dns")
const mongoose = require('mongoose')
const shortid = require('shortid')

// Basic Configuration - setup up port
const port = process.env.PORT || 3000;

app.use(cors());

// set up public file
app.use('/public', express.static(`${process.cwd()}/public`));
// parse form data
app.use(express.urlencoded({extended: true}));
// parse json
app.use(express.json());

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

const user = process.env.user
const password = process.env.password
const server = process.env.server

mongoose.set('useFindAndModify', false);

mongoose.connect(`mongodb+srv://${user}:${password}@${server}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( () => console.log("MongoDB Connected..."))
        .catch(err => console.log(err))

const url_schema = new mongoose.Schema({
  "original_url": { type: String, required: true},
  "short_url": { type: String, required: true}
});

const Url = new mongoose.model('url', url_schema);

// Serve homepage
app.get('/', function (req,res) {
  res.sendFile(process.cwd() + '/views/index.html')
});

// Test endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' })
});

const REPLACE_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/


// create and save new Url
app.post('/api/shorturl', async(req,res) => {
  if (!REPLACE_REGEX.test(req.body.url)){
    console.log("error: invalid url - regex fail")
    return res.json({
      error:"invalid url"
    })
  } else {
    try {
      console.log("Body")
      console.log(req.body)
      console.log("Params")
      console.log(req.params)
      console.log("Query")
      console.log(req.query)
      console.log(req.body.url)
      const current = await Url.findOne({original_url: req.body.url})
      if (current) {
        return res.json({
          "original_url": current.original_url,
          "short_url": current.short_url
        })
      } else {
        const newRecord = new Url({
          original_url: req.body.url,
          short_url: shortid.generate(req.body.url)
        })
        console.log("new URL is: " + newRecord)
        await newRecord.save();
        return res.json({
          "original_url": newRecord.original_url,
          "short_url": newRecord.short_url
        })
      }
    } catch (e) {
    if (e instanceof TypeError)
      console.log("error: invalid url - type error")
      res.json({
        error: "invalid url",
      });
  }

  }
})

app.get('/api/shorturl/:id?', async (req,res) => {
  try {
    const find = await Url.findOne({short_url: req.params.id});
    console.log(find)
    console.log(typeof(find))
    if(!find) {
      return res.json({
        "error": "invalid url"
      })
    }
    console.log(find.original_url)
    return res.redirect(301, find.original_url)
  } catch (e) {
    console.log(e);
    return res.json({
      "error": "Bad request"
    })
  }
})
