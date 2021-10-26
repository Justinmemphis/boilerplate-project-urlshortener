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

  // test if there is a Url included
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
  let short_url = req.body
  model.save((err,doc) => {
    if (!doc || doc.length == 0) {
      return res.status(500).send(doc)
    } else if (failure === "yes") {
      return "invalid url"
    } else if (err) {
      return res.status(500).json(err)
    } else {
      res.status(201).json({original_url:doc.url, short_url:doc.short_url})
      // res.status(201).send(doc)
    }
  })

}

const findUrl = (req,res) => {
  const {id} = req.params
  if (!id) {
    return res.status(400).json({success:false,message:'please provide a URL'})
  }
  //let model = new UrlModel(req.params)
  UrlModel.findOne({ short_url:Number(id) }, (err, result) => {
    if (err) {
      return res.send(err)
    } else {
      //console.log(stringify(result.url))
      //return res.status(302).redirect(`${result.url}`)
      return res.status(200).json({result})
    }
  })
}

module.exports = {
  homePage,
  greeting,
  createNewUrl,
  findUrl
}
