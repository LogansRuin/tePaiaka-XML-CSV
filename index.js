const fs = require('fs')
const path = require('path')

const app = 'Hello world'

// read xml

// convert xml to js object
// for the moment just going to start with an existing json
const categories = require('./data/categories.json').category[0]

// find children for a category
function findChildren (id, arr) {
  const children = []
  arr.forEach(category => {
    if (category.parent == id) {
      children.push(category.categoryId)
    }
  })
  return children
}

// add children key to each and fill with direct decendants of the tree

// set up for csv with rows array

// write csv file to data folder

module.exports = { app, findChildren }
