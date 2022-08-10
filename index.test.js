const app = require('./index')

test('Tests are working', () => {
  expect(false).toBeFalsy()
})

describe('findChildren', () => {
  const arr = [
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
    expect(app.findChildren(1001, arr)).toEqual(expect.arrayContaining([1002, 1003, 1005]))
    expect(app.findChildren(1001, arr)).not.toEqual(expect.arrayContaining([1001, 1004]))
    expect(app.findChildren(1001, arr).length).toBe(3)
  })
})

describe('insertChildren', () => {
  const arr = [
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
    const newArr = app.insertChildren(arr)
    expect(newArr.length).toBe(5)
    expect(newArr[0].children).toEqual(expect.arrayContaining([1002, 1003, 1005]))
  })

  test('categories without children have empty array', () => {
    const newArr = app.insertChildren(arr)
    expect(newArr[4].children.length).toBe(0)
  })
})
