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
    const n = mewt(a)
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
  {
    // shift
    const a = mewt([1, 2])
    const [num, n] = a.shift()
    t.equal(num, 1)
    t.deepEqual(n, [2])
    t.notEqual(a, n)
  }
  {
    // sort
    const a = mewt(['c', 'b', 'a'])
    const n = a.sort()
    t.deepEqual(n, ['a', 'b', 'c'])
    t.notEqual(a, n)
  }
  {
    // sort
    const a = mewt(['a', 'b', 'c'])
    const n = a.splice(0, 1)
    t.deepEqual(n, ['b', 'c'])
    t.notEqual(a, n)
  }
  {
    // unshift
    const a = mewt([2])
    const [len, n] = a.unshift(1)
    t.equal(len, 2)
    t.deepEqual(n, [1, 2])
    t.notEqual(a, n)
  }
  t.end()
})

test('object', (t) => {
  {
    // returns new object
    const o = {}
    const n = mewt(o)
    t.notEqual(o, n)
  }
  {
    //
    const o = {}
    const n = mewt(o)
    t.notEqual(o, n)
  }
  t.end()
})
