const express = require('express')
const router = express.Router()

const {
  homePage,
  greeting,
  createNewUrl,
  findUrl
} = require('../controllers/controller')

router.route('/').get(homePage)
router.route('/api/hello').get(greeting)
router.route('/api/shorturl').post(createNewUrl)
router.route('/api/shorturl/:id').get(findUrl)




module.exports = router
