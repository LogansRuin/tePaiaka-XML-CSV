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
function insertChildren (arr) {
  arr.forEach(category => {
    const children = findChildren(category.categoryId, arr)
    category.children = children
  })
  return arr
}

// set up for csv with rows array
function buildCsvData (obj, arr, rows = [['name', 'id', 'level 1', 'level 2', 'level 3', 'level 4']], treeDepth = 0) {
  if (obj.children.length > 0) {
    const children = obj.children

    children.forEach(childId => {
      // find object in array with child as the categoryID
      const child = arr.find(e => e.categoryId == childId)

      if (rows.length > 1) {
        // make copy of parent row
        const row = JSON.parse(JSON.stringify(rows.find(e => e[1] == child.parent)))
        // replace name and categoryId with child values
        row[0] = child['display-name']
        row[1] = child.categoryId
        // add child category id to the end of array
        row.push(child.categoryId)
        // add child row to the array
        rows.push(row)
      } else {
        // create first row of data
        const row = [child['display-name'], child.categoryId]
        row[2] = child.parent
        row[3] = child.categoryId
        // add row to the array
        rows.push(row)
      }

      buildCsvData(child, arr, rows, treeDepth)
    })
  } else {
    treeDepth = 0
  }
  // start with the chidren of root and build out new arr
  console.log(rows)
  return rows
}

// // add and populate children property to categories
// const rows = []
// const categories = insertChildren(arr)

// write csv file to data folder

module.exports = { app, findChildren, insertChildren, buildCsvData }
