const { insertChildren, buildCsvData, writeCsvFile } = require('./helpers/csvBuilder')
const json = require('./data/categories.json')

function app (json) {
  const arr = insertChildren(json.category)
  const data = buildCsvData(arr[0], arr)
  writeCsvFile(data)
}
app(json)

module.exports = { app }
