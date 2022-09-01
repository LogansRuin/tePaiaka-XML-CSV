const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
const util = require('util')

const filePath = path.join(__dirname, './../data/twl-storefront-20220824.xml')

let catalog = new Object

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
      console.dir(categories)
    })
    .catch((err) => console.error(err))
})

