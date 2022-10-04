const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const upload = multer({ 
  dest: 'data/uploads',
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname)
    if (ext !== ".xml") {
      return callback( new Error('File format must be application/xml'))
    }
    callback(null, true)
  }
})

router.get('/', (req, res, next) => {
  res.json({
    msg: "router is working"
  })
})

router.post('/category', upload.single('uploaded_file'), (req, res, next) => {
  const filename = `${req.body.filename}-${Date.now()}.xml`
  const oldPath = req.file.path
  const newPath = `${req.file.destination}/${filename}`
  fs.rename( oldPath, newPath, (err) => {
    if (err) throw err
    res.json({
      success: true,
      msg: "File writen",
      path: newPath,
      feilds: req.body,
      file: req.file
    })
  })
})

module.exports = router
