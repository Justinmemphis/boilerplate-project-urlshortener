const express = require('express')
const router = express.Router()

const {
  homePage,
  greeting,
  createNewUrl
} = require('../controllers/controller')

router.route('/').get(homePage)
router.route('/api/hello').get(greeting)
router.route('/api/shorturl').post(createNewUrl)




module.exports = router
