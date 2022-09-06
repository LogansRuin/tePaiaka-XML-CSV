const { insertChildren, buildCsvData, writeCsvFile } = require('./helpers/csvBuilder')
const { transformXml } = require('./helpers/transformXml')
const path = require('path')

const xmlPath = path.join(__dirname, '/data/wsl-nav-20220822.xml')
// const json = require('./data/twlcat.json')

function app (filePath) {
  transformXml(filePath).then(res => {
    const arr = insertChildren(res)
    const root = arr[0]
    const data = buildCsvData(root, arr)
    writeCsvFile(data)
  })
  
}
app(xmlPath)

module.exports = { app }
