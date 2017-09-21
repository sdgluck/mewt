const path = require('path')
const benchmark = require('brolly')

const mewt = path.resolve(__dirname, './index')
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')

const run = benchmark('brolly', [
  function mutable (mewt, chars, done) {
    const obj = {}
    for (const char of chars) {
      obj[char] = char
    }
    done()
  },
  function immutable_object (mewt, chars, done) {
    const obj = mewt({})
    for (const char of chars) {
      obj.$set(char, char)
    }
    done()
  },
  function immutable_array (mewt, chars, done) {
    const obj = mewt([])
    for (let i = 0; i < chars.length; i++) {
      obj.$set(i, chars[i])
    }
    done()
  }
], [mewt, chars])

run(5000).print()
