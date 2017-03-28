'use strict'

const test = require('tape')
const mewt = require('./lib')

const createAssertMewt = t => input => {
  t.equal(typeof input.$set, 'function')
  t.equal(typeof input.$unset, 'function')
  // TODO any other way to test? Cannot check if instanceof Proxy
}

test('exports a function', (t) => {
  t.equal(typeof mewt, 'function')
  t.end()
})

test('throws without object or array', (t) => {
  t.throws(() => mewt(), /accepts array or object/)
  t.end()
})

test('array', (t) => {
  const assertMewt = createAssertMewt(t)
  {
    // returns new array
    const a = []
    const n = mewt(a)
    t.notEqual(a, n)
  }
  {
    // throws on mutation
    const a = mewt([])
    t.throws(() => a[0] = 'Lodger', /immutable/)
  }
  {
    // has $set & $unset
    const a = mewt([])
    assertMewt(a)
  }
  {
    // get own property
    const a = mewt([''])
    t.equal(a[0], '')
  }
  {
    // $set
    const a = mewt([])
    const n = a.$set(0, '')
    t.deepEqual(n, [''])
    t.notEqual(a, n)
    assertMewt(n)
  }
  {
    // $unset
    const a = mewt([''])
    const n = a.$unset(0)
    t.deepEqual(n, [])
    t.notEqual(a, n)
    assertMewt(n)
  }
  {
    // copyWithin
    const a = mewt([1, 2])
    const n = a.copyWithin(0, 2)
    t.deepEqual(n, [1, 2])
    t.notEqual(a, n)
    assertMewt(n)
  }
  {
    // fill
    const a = mewt([,])
    const n = a.fill('')
    t.deepEqual(n, [''])
    t.notEqual(a, n)
    assertMewt(n)
  }
  {
    // pop
    const a = mewt([''])
    const [str, n] = a.pop()
    t.deepEqual(a, [''])
    t.equal(str, '')
    t.deepEqual(n, [])
    t.notEqual(a, n)
    assertMewt(n)
  }
  {
    // push
    const a = mewt([])
    const [len, n] = a.push('')
    t.equal(1, len)
    t.deepEqual(n, [''])
    t.notEqual(a, n)
    assertMewt(n)
  }
  {
    // reverse
    const a = mewt([1, 2])
    const n = a.reverse()
    t.deepEqual(n, [2, 1])
    t.notEqual(a, n)
    assertMewt(n)
  }
  {
    // shift
    const a = mewt([1, 2])
    const [num, n] = a.shift()
    t.equal(num, 1)
    t.deepEqual(n, [2])
    t.notEqual(a, n)
    assertMewt(n)
  }
  {
    // sort
    const a = mewt(['c', 'b', 'a'])
    const n = a.sort()
    t.deepEqual(n, ['a', 'b', 'c'])
    t.notEqual(a, n)
    assertMewt(n)
  }
  {
    // sort
    const a = mewt(['a', 'b', 'c'])
    const n = a.splice(0, 1)
    t.deepEqual(n, ['a'])
    t.notEqual(a, n)
    assertMewt(n)
  }
  {
    // unshift
    const a = mewt([2])
    const [len, n] = a.unshift(1)
    t.equal(len, 2)
    t.deepEqual(n, [1, 2])
    t.notEqual(a, n)
    assertMewt(n)
  }
  {
    // filter
    const a = mewt([1, 2, 3, 4, 5])
    const filtered = a.filter(e => e % 2 === 0)
    t.deepEqual(filtered, [2, 4])
    assertMewt(filtered)
  }
  {
    // map
    const a = mewt([1, 2, 3, 4, 5])
    const transformed = a.map(e => e * 2)
    t.deepEqual(transformed, [2, 4, 6, 8, 10])
    assertMewt(transformed)
  }
  {
    // concat
    const a = mewt([1, 2]).concat([3, 4, 5])
    t.deepEqual(a, [1, 2, 3, 4, 5])
    assertMewt(a)

    const b = mewt([5, 4]).concat(mewt([3, 2, 1]))
    t.deepEqual(b, [5, 4, 3, 2, 1])
    assertMewt(b)
  }
  {
    // slice
    const a = mewt([1, 2, 3, 4, 5])
    const sliced = a.slice(1, 4)
    t.deepEqual(sliced, [2, 3, 4])
    assertMewt(sliced)
  }
  t.end()
})

test('object', (t) => {
  const assertMewt = createAssertMewt(t)
  {
    // returns new object
    const o = {}
    const n = mewt(o)
    t.notEqual(o, n)
  }
  {
    // throws on mutation
    const o = mewt({})
    t.throws(() => o.track = 'The Promise', /immutable/)
  }
  {
    // has $set & $unset
    const o = mewt({})
    assertMewt(o)
  }
  {
    // get own property
    const o = mewt({ album: 'Aladdin Sane' })
    t.equal(o.album, 'Aladdin Sane')
  }
  {
    // $set
    const o = mewt({})
    const n = o.$set('album', 'Hours')
    t.equal(o.album, undefined)
    t.equal(n.album, 'Hours')
    t.notEqual(o, n)
  }
  {
    // $unset
    const o = mewt({ album: 'Heroes' })
    const n = o.$unset('album')
    t.equal(o.album, 'Heroes')
    t.equal(n.album, undefined)
    t.notEqual(o, n)
  }
  t.end()
})
