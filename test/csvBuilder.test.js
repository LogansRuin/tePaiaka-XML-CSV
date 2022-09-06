const csvBuilder = require('../helpers/csvBuilder')


// Set Up data
const dataNoChildren = [
  {
    cgid: 'root',
    name: 'root',
    parent: '',
    online: true
  },
  {
    cgid: 1001,
    name: 'fruit',
    parent: 'root',
    online: true
  },
  {
    cgid: 1002,
    name: 'apple',
    parent: '1001',
    online: true
  },
  {
    cgid: 1003,
    name: 'grapes',
    parent: '1001',
    online: true
  },
  {
    cgid: 1004,
    name: 'granny smith',
    parent: '1002',
    online: true
  },
  {
    cgid: 1005,
    name: 'kiwifruit',
    parent: '1001',
    online: true
  },
  {
    cgid: 1006,
    name: 'organic',
    parent: '1004',
    online: true
  },
  {
    cgid: 1007,
    name: 'organic',
    parent: 'root',
    online: true
  }
]

const dataWithChildren = [
  {
    cgid: 'root',
    name: 'root',
    children: [1001, 1007],
    parent: '',
    online: true
  },
  {
    cgid: 1001,
    name: 'fruit',
    children: [1002, 1003, 1005],
    parent: 'root',
    online: true
  },
  {
    cgid: 1002,
    name: 'apple',
    children: [1004],
    parent: '1001',
    online: true
  },
  {
    cgid: 1003,
    name: 'grapes',
    children: [],
    parent: '1001',
    online: true
  },
  {
    cgid: 1004,
    name: 'granny smith',
    children: [1006],
    parent: '1002',
    online: true
  },
  {
    cgid: 1005,
    name: 'kiwifruit',
    children: [],
    parent: '1001',
    online: true
  },
  {
    cgid: 1006,
    name: 'organic',
    children: [],
    parent: '1004',
    online: true
  },
  {
    cgid: 1007,
    name: 'organic',
    children: [],
    parent: 'root',
    online: true
  }
]

const dataWithNullName = [
  {
    cgid: 'root',
    name: 'root',
    children: [1001, 1007],
    parent: '',
    online: true
  },
  {
    cgid: 1001,
    name: 'fruit',
    children: [1002, 1003, 1005],
    parent: 'root',
    online: true
  },
  {
    cgid: 1002,
    name: 'apple',
    children: [1004],
    parent: '1001',
    online: true
  },
  {
    cgid: 1003,
    name: 'grapes',
    children: [],
    parent: '1001',
    online: true
  },
  {
    cgid: 1004,
    name: 'granny smith',
    children: [1006],
    parent: '1002',
    online: true
  },
  {
    cgid: 1005,
    name: 'kiwifruit',
    children: [],
    parent: '1001',
    online: true
  },
  {
    cgid: 1006,
    name: 'organic',
    children: [],
    parent: '1004',
    online: true
  },
  {
    cgid: 1007,
    name: null,
    children: [],
    parent: 'root',
    online: true
  }
]

// Tests for findChildren()
describe('findChildren', () => {
  test('returns an array', () => {
    expect(csvBuilder.findChildren(1001, dataNoChildren)).toEqual(expect.arrayContaining([1002, 1003, 1005]))
    expect(csvBuilder.findChildren(1001, dataNoChildren)).not.toEqual(expect.arrayContaining([1001, 1004]))
    expect(csvBuilder.findChildren(1001, dataNoChildren).length).toBe(3)
  })
})

// Tests for insertChild()
describe('insertChildren', () => {
  test('categories with children have array with values', () => {
    const arr = csvBuilder.insertChildren(dataNoChildren)
    expect(arr.length).toBe(8)
    expect(arr[0].children).toEqual(expect.arrayContaining([1001, 1007]))
  })

  test('categories without children have empty array', () => {
    const arr = csvBuilder.insertChildren(dataNoChildren)
    expect(arr[3].children.length).toBe(0)
  })
})

// Tests for buildCsvData()
describe('buildCsvData: General tests', () => {
  test('returns and array with 9 arrays nested init', () => {
    const arr = csvBuilder.buildCsvData(dataWithChildren[0], dataWithChildren)
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

describe ('buildCsvData: Tree tests', () => {
  test('array should show the heritage of the given category by Name', () => {
    let arr = csvBuilder.buildCsvData(dataWithChildren[0], dataWithChildren)
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

describe ('buildCsvData: Online tests', () => {
  // test('array should tell us whether the catgory is online', () => {
    
  // })
})

describe ('buildCsvData: Name tests', () => {
  test('array should have a name', () => {
    const arr = csvBuilder.buildCsvData(dataWithChildren[0], dataWithChildren)
    let name = arr[3][0]
    expect(name).toEqual('apple')
    expect(name).not.toBe
  })
})

describe ('buildCsvData: CGID tests', () => {
  test('array should have a cgid', () => {
    const arr = csvBuilder.buildCsvData(dataWithChildren[0], dataWithChildren)
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

describe('buildCsvData: URI tests', () => {
  // test('array should have a uri begining with /c/', () => {
  //   const arr = csvBuilder.buildCsvData(dataWithChildren[0], dataWithChildren)
  //   let uri = arr[2][2]
  //   expect(uri).toEqual('/c/fruit')
  //   expect(uri).not.toEqual('/c/Fruit')
  //   uri = arr[3][2]
  //   expect(uri).toEqual('/c/fruit/apple')
  // })
})

// write tests for writeCsvFile - require mock knowledge
