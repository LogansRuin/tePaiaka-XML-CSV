const fs = require('fs')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()

const transformXml = (filePath) => {
  return new Promise ( res => {
    const categories = fs.readFile(filePath, (err, data) => {
      parser.parseStringPromise(data)
        .then((result) => { return result.catalog.category })
        .then((result) => {
          const categories = new Array
          for (let i = 0; i < result.length; i++) {
            const data = result[i]
            const category = new Object
            // extract required attributes from data
            category.cgid = data.$['category-id']
            category.name = data['display-name'][0]._
            category.parent = data.parent === undefined ? null : data.parent[0]
            category.online = data['online-flag'][0]
            // add category to array
            categories.push(category)
          }
          res(categories)
        })
        .catch((err) => console.error(err))
    })
  })
}

// const path = require('path')
// const filePath = path.join(__dirname, './../data/twl-storefront-20220824.xml')
// transformXml(filePath)
//   .then((res) => {
//     console.dir(res)
//   })

module.exports = { transformXml }
