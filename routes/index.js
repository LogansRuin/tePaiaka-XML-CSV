const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const { transformXml } = require('../helpers/transformXml')
const csvBuilder = require('../helpers/csvBuilder')

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
  const filename = `${req.body.filename}-${Date.now()}`
  const oldPath = req.file.path
  const newPath = `${req.file.destination}/${filename}.xml`
  fs.rename( oldPath, newPath, (err) => {
    if (err) throw err
    transformXml(newPath)
    .then(result => {
      const arr = csvBuilder.insertChildren(result)
      const root = arr[0]
      const data = csvBuilder.buildCsvData(root, arr)
      csvBuilder.writeCsvFile(data, `${filename}`)
    })
    .then(
      result => {
        res.send(result)
        // const fileLocation = path.normalize(path.join(__dirname, `/../data/downloads/${filename}.csv`))
        // res.download(fileLocation, filename, (err) => {
        //   if (err) throw err
        // })
      }
    )
  })
})

module.exports = router
