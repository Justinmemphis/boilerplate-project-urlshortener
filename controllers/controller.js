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
  const { original_url } = req.body.url
  console.log(original_url)

  // test if there is a Url included
  if (!original_url) {
    return res.status(400).json({success:false,message:'please provide a URL'})
  }

  // REGEX to convert to format that will pass DNS
  const REPLACE_REGEX = /^https?:\/\//i
  const urlOne = original_url.replace(REPLACE_REGEX, '')
  console.log("urlOne is: " + urlOne)

  // DNS validation
  dns.resolve(urlOne, (err, address) => {
    if (err == null) {
      console.log("No errors: " + err + " - " + address)

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
          res.status(201).json({original_url:doc.original_url, short_url:doc.short_url})
          // res.status(201).send(doc)
        }
      })
    } else {
      failure = "yes"
      return res.status(400).json({success:false,message: 'invalid url' })
    }
  })



}

const findUrl = (req,res) => {
  let {id} = req.params
  if (!id) {
    return res.status(400).json({success:false,message:'please provide a URL'})
  }
  //let model = new UrlModel(req.params)
  UrlModel.findOne({ short_url:Number(id) }, (err, result) => {
    if (err) {
      return res.send(err)
    } else if (id < 18) {
      return res.status(400).json({success:false,message:'please provide a valid URL'})
    } else {


      const REPLACE_REGEX = /^https?:\/\//i
      const urlTwo = result.original_url.replace(REPLACE_REGEX, '')
      console.log("urlTwo is: " + urlTwo)

      // DNS validation
      dns.resolve(urlTwo, (err, address) => {
        if (err == null) {
          console.log("No errors: " + err + " - " + address)
          console.log(result.original_url)
          console.log(Number(result.short_url))
          return res.status(307).redirect(`//${urlTwo}`)
        } else {
          failure = "yes"
          return res.status(400).json({success:false,message: 'invalid url' })
        }
      })

    }
  })
}

module.exports = {
  homePage,
  greeting,
  createNewUrl,
  findUrl
}
