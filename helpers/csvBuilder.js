const { writeFile } = require('fs')
const path = require('path')

// find children for a category
function findChildren (id, arr) {
  const children = []
  arr.forEach(category => {
    if (category.parent == id) {
      children.push(category.cgid)
    }
  })
  return children
}

// add children key to each and fill with direct decendants of the tree
function insertChildren (arr) {
  arr.forEach(category => {
    const children = findChildren(category.cgid, arr)
    category.children = children
  })
  return arr
}

const csvHeader = ['name', 'id', 'root', 'level 1', 'level 2', 'level 3', 'level 4', 'level 5']

// set up for csv with rows array
function buildCsvData (obj, arr, rows = [csvHeader, [obj.name, obj.cgid, obj.cgid]], treeDepth = 0) {
  if (obj.children.length > 0) {
    const children = obj.children

    children.forEach(childId => {
      // find object in array with child as the categoryID
      const child = arr.find(e => e.cgid == childId)
      // make deep copy of parent array to buld upon
      const row = JSON.parse(JSON.stringify(rows.find(e => e[1] == child.parent)))
      // replace name and categoryId with child values
      row[0] = child.name
      row[1] = child.cgid
      // add child name to the end of array
      row.push(child.name)
      // add child row to the array
      rows.push(row)
      // recurse
      buildCsvData(child, arr, rows, treeDepth)
    })
  } else {
    treeDepth = 0
  }
  return rows
}

// write csv file to data folder
function writeCsvFile (data, namePrefix = 'categoryTree-') {
  // clean data
  const cleanData = data.map(row => row.map(e => {
    if (e === null) {
      return ""
    } else {
      e.toString()
      return `"${e}"`
    }
  }))
  
  data = cleanData.map(row => row.join()).join('\n')

  // create unique file name and path
  const filename = namePrefix + Date.now()
  const fileLocation = path.normalize(path.join(__dirname, '/../data/'))

  writeFile(`${fileLocation}/${filename}.csv`, data, (err) => {
    if (err) {
      throw err
    } else {
      return true
    }
  })
}

module.exports = { findChildren, insertChildren, buildCsvData, writeCsvFile }
