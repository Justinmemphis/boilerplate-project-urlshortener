const dns = require("dns")
const UrlModel = require('../models/url.model')

// Serve homepage
const homePage = (req,res) => {
  res.sendFile(process.cwd() + '/views/index.html')
}

// Test endpoint
const greeting = (req, res) => {
  res.json({ greeting: 'hello API' })
}

// create and save new Url
const createNewUrl = (req,res) => {
  let failure = "";
  const {url} = req.body

  // test if there is a URL included
  if (!url) {
    return res.status(400).json({success:false,message:'please provide a URL'})
  }

  // REGEX to convert to format that will pass DNS
  const REPLACE_REGEX = /^https?:\/\//i
  const urlOne = url.replace(REPLACE_REGEX, '')
  console.log("urlOne is: " + urlOne)

  // DNS validation
  dns.resolve(urlOne, (err, address) => {
    if (err == null) {
      console.log("No errors: " + err + " - " + address)
    } else {
      failure = "yes"
      return res.status(400).json({success:false,message: 'invalid url' })
    }
  })

  // save new URL
  let model = new UrlModel(req.body)
  model.save((err,doc) => {
    if (!doc || doc.length == 0) {
      return res.status(500).send(doc)
    } else if (failure === "yes") {
      return "invalid url"
    } else if (err) {
      return res.status(500).json(err)
    } else {
      res.status(201).json({original_url:`${req.body}`, short_url:short_url})
      // res.status(201).send(doc)
    }
  })

}

module.exports = {
  homePage,
  greeting,
  createNewUrl
}
