'use strict'

const test = require('tape')
const mewt = require('./index')

test('exports a function', (t) => {
  t.equal(typeof mewt, 'function')
  t.end()
})

test('throws without object or array', (t) => {
  t.throws(() => mewt(), /accepts array or object/)
  t.end()
})

test('array', (t) => {
  {
    // returns new array
    const a = []
    const n = mewt([])
    t.notEqual(a, n)
  }
  {
    // copyWithin
    const a = mewt([1, 2])
    const n = a.copyWithin(0, 2)
    t.deepEqual(n, [1, 2])
    t.notEqual(a, n)
  }
  {
    // fill
    const a = mewt([,])
    const n = a.fill('')
    t.deepEqual(n, [''])
    t.notEqual(a, n)
  }
  {
    // pop
    const a = mewt([''])
    const [str, n] = a.pop()
    t.equal(str, '')
    t.deepEqual(n, [])
    t.notEqual(a, n)
  }
  {
    // push
    const a = mewt([])
    const [len, n] = a.push('')
    t.equal(1, len)
    t.deepEqual(n, [''])
    t.notEqual(a, n)
  }
  {
    // reverse
    const a = mewt([1, 2])
    const n = a.reverse()
    t.deepEqual(n, [2, 1])
    t.notEqual(a, n)
  }
  t.end()
})
