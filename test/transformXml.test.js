const exp = require('constants');
const path = require('path')
const testPath = path.join(__dirname, '/data/test.xml')
const poorlyFormedPath = path.join(__dirname, '/data/poorlyFormed.xml')
const { transformXml } = require("../helpers/transformXml");

// Tests for transformXml
describe('transformXML', () => {
  test('transformXML should error if XML is not well formed', () => {
    return transformXml(poorlyFormedPath)
      .then((res) => {console.log(res[0])})
      .catch((err) => {
        expect(err).toBeTruthy()
      })
  })

  test('nested objects have 4 properties', () => {
    return transformXml(testPath)
      .then((res) => {
        const objKey = Math.floor(Math.random() * res.length)
        const arr = Object.keys(res[objKey])
        expect(arr.length).toEqual(4)
        expect(arr.includes('cgid')).toBeTruthy()
        expect(arr.includes('name')).toBeTruthy()
        expect(arr.includes('parent')).toBeTruthy()
        expect(arr.includes('online')).toBeTruthy()
      })
  })
})

