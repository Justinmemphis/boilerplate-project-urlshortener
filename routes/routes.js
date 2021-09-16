const UrlModel = require('../models/url.model')
const express = require('express')
const dns = require("dns")
const router = express.Router()

// Create a new Url
router.post('/shorturl', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing')
  }

  var long_url = req.body.original_url
  console.log("long_url is :" + long_url)
  const REPLACE_REGEX = /^https?:\/\//i

  const urlOne = long_url.replace(REPLACE_REGEX, '')
  console.log("urlOne is: " + urlOne)

  dns.lookup(urlOne, function onLookup(err, address, family) {
    if (err == null) {
      console.log("No errors: " + err + " - " + address + " - " + family)
    } else {
      res.json({ error: 'invalid url' })
    }
  })

  let model = new UrlModel(req.body)
  model.save()
    .then(doc => {
      if(!doc || doc.length == 0) {
        return res.status(500).send(doc)
      }

      res.status(201).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router
