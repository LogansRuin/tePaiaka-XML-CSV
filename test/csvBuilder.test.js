const csvBuilder = require('../helpers/csvBuilder')

const data = [
  {
    categoryId: 'root',
    'display-name': 'root',
    children: [1001, 1007],
    parent: '',
    online: true
  },
  {
    categoryId: 1001,
    'display-name': 'fruit',
    children: [1002, 1003, 1005],
    parent: 'root',
    online: true
  },
  {
    categoryId: 1002,
    'display-name': 'apple',
    children: [1004],
    parent: '1001',
    online: true
  },
  {
    categoryId: 1003,
    'display-name': 'grapes',
    children: [],
    parent: '1001',
    online: true
  },
  {
    categoryId: 1004,
    'display-name': 'granny smith',
    children: [1006],
    parent: '1002',
    online: true
  },
  {
    categoryId: 1005,
    'display-name': 'kiwifruit',
    children: [],
    parent: '1001',
    online: true
  },
  {
    categoryId: 1006,
    'display-name': 'organic',
    children: [],
    parent: '1004',
    online: true
  },
  {
    categoryId: 1007,
    'display-name': 'organic',
    children: [],
    parent: 'root',
    online: true
  }
]

describe('findChildren', () => {
  test('returns an array', () => {
    expect(csvBuilder.findChildren(1001, data)).toEqual(expect.arrayContaining([1002, 1003, 1005]))
    expect(csvBuilder.findChildren(1001, data)).not.toEqual(expect.arrayContaining([1001, 1004]))
    expect(csvBuilder.findChildren(1001, data).length).toBe(3)
  })
})

describe('insertChildren', () => {
  test('categories with children have array with values', () => {
    const arr = csvBuilder.insertChildren(data)
    expect(arr.length).toBe(8)
    expect(arr[0].children).toEqual(expect.arrayContaining([1001, 1007]))
  })

  test('categories without children have empty array', () => {
    const arr = csvBuilder.insertChildren(data)
    expect(arr[3].children.length).toBe(0)
  })
})

describe('buildCsvData', () => {
  test('returns and array with 9 arrays nested init', () => {
    const arr = csvBuilder.buildCsvData(data[0], data)
    expect(arr.length).toBe(9)
    expect(Array.isArray(arr[0])).toBeTruthy()
    expect(Array.isArray(arr[1])).toBeTruthy()
    expect(Array.isArray(arr[2])).toBeTruthy()
    expect(Array.isArray(arr[3])).toBeTruthy()
    expect(Array.isArray(arr[4])).toBeTruthy()
    expect(Array.isArray(arr[5])).toBeTruthy()
    expect(Array.isArray(arr[6])).toBeTruthy()
    expect(Array.isArray(arr[7])).toBeTruthy()
    expect(Array.isArray(arr[8])).toBeTruthy()
  })
})

describe ('buildCSV: Tree tests', () => {
  test('array should show the heritage of the given category by Name', () => {
    let arr = csvBuilder.buildCsvData(data[0], data)
    const treeArr = []
    arr.forEach(row =>  treeArr.push(row.slice(2)))
    expect(treeArr[0]).toEqual(expect.arrayContaining(['root', 'level 1', 'level 2', 'level 3']))
    expect(treeArr[1]).toEqual(expect.arrayContaining(['root']))
    expect(treeArr[2]).toEqual(expect.arrayContaining(['root', 'fruit']))
    expect(treeArr[3]).toEqual(expect.arrayContaining(['root', 'fruit', 'apple']))
    expect(treeArr[4]).toEqual(expect.arrayContaining(['root', 'fruit', 'apple', 'granny smith']))
    expect(treeArr[5]).toEqual(expect.arrayContaining(['root', 'fruit', 'apple', 'granny smith', 'organic']))

  })
})

// describe ('buildCSV: Online tests', () => {
//   test('array should tell us whether the catgory is online', () => {
    
//   })
// })

describe ('buildCSV: Name tests', () => {
  test('array should have a name', () => {
    const arr = csvBuilder.buildCsvData(data[0], data)
    let name = arr[3][0]
    expect(name).toEqual('apple')
    expect(name).not.toBe
  })
})

describe ('buildCSV: CGID tests', () => {
  test('array should have a cgid', () => {
    const arr = csvBuilder.buildCsvData(data[0], data)
    let uri = arr[2][1]
    expect(uri).toEqual(1001)
    uri = arr[3][1]
    expect(uri).toEqual(1002)
    uri = arr[5][1]
    expect(uri).toEqual(1006)
  })

  // test('cgid should not include special characters other than - as the join', () => {
  
  // })
})

describe('buildCSV: URI tests', () => {
  // test('array should have a uri begining with /c/', () => {
  //   const arr = csvBuilder.buildCsvData(data[0], data)
  //   let uri = arr[2][2]
  //   expect(uri).toEqual('/c/fruit')
  //   expect(uri).not.toEqual('/c/Fruit')
  //   uri = arr[3][2]
  //   expect(uri).toEqual('/c/fruit/apple')
  // })
})

// write tests for writeCsvFile - require mock knowledge
