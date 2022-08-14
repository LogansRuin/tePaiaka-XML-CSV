const { insertChildren, buildCsvData, writeCsvFile } = require('./helpers/csvBuilder')
const json = require('./data/categories.json')
function app (json) {
  const arr = insertChildren(json.category)
  console.log(arr[0])
  console.log(arr[1])
  const data = buildCsvData(arr[1], arr)
  console.log(data)
}
app(json)

module.exports = { app }
