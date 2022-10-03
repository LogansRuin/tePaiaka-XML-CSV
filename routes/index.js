const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.json({
    msg: "router is working"
  })
})

module.exports = router