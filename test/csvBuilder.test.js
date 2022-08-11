const csvBuilder = require('../helpers/csvBuilder')

describe('findChildren', () => {
  const data = [
    {
      categoryId: 1001,
      parent: 'root'
    },
    {
      categoryId: 1002,
      parent: '1001'
    },
    {
      categoryId: 1003,
      parent: '1001'
    },
    {
      categoryId: 1004,
      parent: '1002'
    },
    {
      categoryId: 1005,
      parent: '1001'
    }
  ]
  test('returns an array', () => {
    expect(csvBuilder.findChildren(1001, data)).toEqual(expect.arrayContaining([1002, 1003, 1005]))
    expect(csvBuilder.findChildren(1001, data)).not.toEqual(expect.arrayContaining([1001, 1004]))
    expect(csvBuilder.findChildren(1001, data).length).toBe(3)
  })
})

describe('insertChildren', () => {
  const data = [
    {
      categoryId: 1001,
      parent: 'root'
    },
    {
      categoryId: 1002,
      parent: '1001'
    },
    {
      categoryId: 1003,
      parent: '1001'
    },
    {
      categoryId: 1004,
      parent: '1002'
    },
    {
      categoryId: 1005,
      parent: '1001'
    }
  ]

  test('categories with children have array with values', () => {
    const arr = csvBuilder.insertChildren(data)
    expect(arr.length).toBe(5)
    expect(arr[0].children).toEqual(expect.arrayContaining([1002, 1003, 1005]))
  })

  test('categories without children have empty array', () => {
    const arr = csvBuilder.insertChildren(data)
    expect(arr[4].children.length).toBe(0)
  })
})

describe('buildCsvData', () => {
  const data = [
    {
      categoryId: 'root',
      'display-name': 'root',
      children: [1001],
      parent: ''
    },
    {
      categoryId: 1001,
      'display-name': 'fruit',
      children: [1002, 1003, 1005],
      parent: 'root'
    },
    {
      categoryId: 1002,
      'display-name': 'apple',
      children: [1004],
      parent: '1001'
    },
    {
      categoryId: 1003,
      'display-name': 'grapes',
      children: [],
      parent: '1001'
    },
    {
      categoryId: 1004,
      'display-name': 'granny smith',
      children: [1006],
      parent: '1002'
    },
    {
      categoryId: 1005,
      'display-name': 'kiwifruit',
      children: [],
      parent: '1001'
    },
    {
      categoryId: 1006,
      'display-name': 'organic',
      children: [],
      parent: '1004'
    }
  ]
  test('returns and array with 7 arrays nested init', () => {
    const arr = csvBuilder.buildCsvData(data[0], data)
    expect(arr.length).toBe(7)
    expect(Array.isArray(arr[0])).toBeTruthy()
    expect(Array.isArray(arr[1])).toBeTruthy()
    expect(Array.isArray(arr[2])).toBeTruthy()
    expect(Array.isArray(arr[3])).toBeTruthy()
    expect(Array.isArray(arr[4])).toBeTruthy()
    expect(Array.isArray(arr[5])).toBeTruthy()
    expect(Array.isArray(arr[6])).toBeTruthy()
  })

  test('array should be ready to convert to CSV', () => {
    const arr = csvBuilder.buildCsvData(data[0], data)
    expect(arr[0]).toEqual(expect.arrayContaining(['name', 'id', 'level 1', 'level 2', 'level 3', 'level 4']))
    expect(arr[1]).toEqual(expect.arrayContaining(['fruit', 1001, 'root', 1001]))
    expect(arr[2]).toEqual(expect.arrayContaining(['apple', 1002, 'root', 1001, 1002]))
    expect(arr[3]).toEqual(expect.arrayContaining(['granny smith', 1004, 'root', 1001, 1002, 1004]))
    expect(arr[4]).toEqual(expect.arrayContaining(['organic', 1006, 'root', 1001, 1002, 1004, 1006]))
  })
})
