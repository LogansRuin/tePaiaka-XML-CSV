const { insertChildren, buildCsvData, writeCsvFile } = require('./helpers/csvBuilder')
const json = require('./data/twlcat.json')

function app (json) {
  const arr = insertChildren(json.category)
  const root = arr[0]
  const data = buildCsvData(root, arr)
  writeCsvFile(data)
}
app(json)

module.exports = { app }
