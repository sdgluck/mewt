'use strict'

const mewt = require('./lib')

describe('mewt', () => {
  const assertMewt = input => {
    expect(typeof input.$set).toBe('function')
    expect(typeof input.$unset).toBe('function')
  }

  describe('generic', () => {
    it('should export a function', () => {
      expect(typeof mewt).toBe('function')
    })
  })

  describe('should throw without object or array type', () => {
    it('should throw when undefined given', () => {
      expect(() => mewt()).toThrowError(/accepts array or object/)
    })

    it('should throw when null given', () => {
      expect(() => mewt(null)).toThrowError(/accepts array or object/)
    })

    it('should throw when string given', () => {
      expect(() => mewt('foo')).toThrowError(/accepts array or object/)
    })

    it('should throw when number given', () => {
      expect(() => mewt(123)).toThrowError(/accepts array or object/)
    })

    it('should throw when boolean given', () => {
      expect(() => mewt(true)).toThrowError(/accepts array or object/)
      expect(() => mewt(false)).toThrowError(/accepts array or object/)
    })

    it('should throw when function given', () => {
      expect(() => mewt(() => { })).toThrowError(/accepts array or object/)
    })

    it('should throw when Symbol given', () => {
      expect(() => mewt(Symbol('foo'))).toThrowError(/accepts array or object/)
    })
  })

  describe('array', () => {
    it('should return a new array', () => {
      const a = []
      const n = mewt(a)
      expect(n).not.toBe(a)
      expect(n).toEqual(a)
    })

    it('should throw on mutation', () => {
      const a = mewt([])
      expect(() => a[0] = 'Lodger').toThrowError(/immutable/)
    })

    it('should have $set & $unset', () => {
      const a = mewt([])
      assertMewt(a)
    })

    it('should get own property', () => {
      const a = mewt([''])
      expect(a[0]).toBe('')
    })

    it('should properly $set at index', () => {
      const a = mewt([])
      const n = a.$set(0, '')
      expect(n).toEqual([''])
      expect(a).not.toBe(n)
      assertMewt(n)
    })

    it('should properly $unset at index', () => {
      const a = mewt([''])
      const n = a.$unset(0)
      expect(n).toEqual([])
      expect(a).not.toBe(n)
      assertMewt(n)
    })

    it('should properly $unset negative indexes and string keys', () => {
      const a = mewt([1, 2, 3])
      const n = a.$set('foo', 'bar')
        .$set(-1, 42)
        .$unset(-1)
        .$unset('foo')
      expect(n).toEqual([1, 2, 3])
    })

    it('should copyWithin without mutation', () => {
      const a = mewt([1, 2])
      const n = a.copyWithin(0, 2)
      expect(n).toEqual([1, 2])
      expect(n).not.toBe(a)
      assertMewt(n)
    })

    it('should fill without mutation', () => {
      const a = mewt([,])
      const n = a.fill('')
      expect(n).toEqual([''])
      expect(a).not.toBe(n)
      assertMewt(n)
    })

    it('should pop without mutation', () => {
      const a = mewt([''])
      const [str, n] = a.pop()
      expect(a).toEqual([''])
      expect(str).toBe('')
      expect(n).toEqual([])
      expect(a).not.toBe(n)
      assertMewt(n)
    })

    it('should push without mutation', () => {
      const a = mewt([])
      const [len, n] = a.push('')
      expect(len).toBe(1)
      expect(n).toEqual([''])
      expect(a).not.toBe(n)
      assertMewt(n)
    })

    it('should reverse without mutation', () => {
      const a = mewt([1, 2])
      const n = a.reverse()
      expect(n).toEqual([2, 1])
      expect(a).not.toBe(n)
      assertMewt(n)
    })

    it('should shift without mutation', () => {
      const a = mewt([1, 2])
      const [num, n] = a.shift()
      expect(num).toBe(1)
      expect(n).toEqual([2])
      expect(a).not.toBe(n)
      assertMewt(n)
    })

    it('should sort without mutation', () => {
      const a = mewt(['c', 'b', 'a'])
      const n = a.sort()
      expect(n).toEqual(['a', 'b', 'c'])
      expect(a).not.toBe(n)
      assertMewt(n)
    })

    it('should splice without mutation', () => {
      const a = mewt(['a', 'b', 'c'])
      const n = a.splice(0, 1)
      expect(n).toEqual(['a'])
      expect(a).not.toBe(n)
      assertMewt(n)
    })

    it('should unshift without mutation', () => {
      const a = mewt([2])
      const [len, n] = a.unshift(1)
      expect(len).toBe(2)
      expect(n).toEqual([1, 2])
      expect(a).not.toBe(n)
      assertMewt(n)
    })

    it('should filter and the new array should be a mewt', () => {
      const a = mewt([1, 2, 3, 4, 5])
      const filtered = a.filter(e => e % 2 === 0)
      expect(filtered).toEqual([2, 4])
      assertMewt(filtered)
    })

    it('should transform (map) and the new array should be a mewt', () => {
      const a = mewt([1, 2, 3, 4, 5])
      const transformed = a.map(e => e * 2)
      expect(transformed).toEqual([2, 4, 6, 8, 10])
      assertMewt(transformed)
    })

    it('should concat and the new array should be a mewt', () => {
      const a = mewt([1, 2]).concat([3, 4, 5])
      expect(a).toEqual([1, 2, 3, 4, 5])
      assertMewt(a)

      const b = mewt([5, 4]).concat(mewt([3, 2, 1]))
      expect(b).toEqual([5, 4, 3, 2, 1])
      assertMewt(b)
    })

    it('should slice and the new array should be a mewt', () => {
      const a = mewt([1, 2, 3, 4, 5])
      const sliced = a.slice(1, 4)
      expect(sliced).toEqual([2, 3, 4])
      assertMewt(sliced)
    })
  })

  describe('object', () => {
    it('should return a new object', () => {
      const o = {}
      const n = mewt(o)
      expect(o).not.toBe(n)
    })

    it('should throw on mutation', () => {
      const o = mewt({})
      expect(() => o.track = 'The Promise').toThrowError(/immutable/)
    })

    it('should throw on Object.defineProperty', () => {
      const o = mewt({})
      expect(() => {
        Object.defineProperty(o, 'foo', {
          value: 'bar'
        })
      }).toThrowError(/immutable/)
    })

    it('should throw on delete', () => {
      const o = mewt({})
      expect(() => {
        delete o.foo
      }).toThrowError(/immutable/)
    })

    it('should throw on setPrototypeOf', () => {
      const o = mewt({})
      expect(() => {
        Object.setPrototypeOf(o, { bar: 'baz' })
      }).toThrowError(/immutable/)
    })

    it('should have $set & $unset', () => {
      const o = mewt({})
      assertMewt(o)
    })

    it('should get own property', () => {
      const o = mewt({ album: 'Aladdin Sane' })
      expect(o.album).toBe('Aladdin Sane')
    })

    it('should properly $set at key', () => {
      const o = mewt({})
      const n = o.$set('album', 'Hours')
      expect(o.album).toBeUndefined()
      expect(n.album).toBe('Hours')
      expect(o).not.toBe(n)
    })

    it('should properly $unset at key', () => {
      const o = mewt({ album: 'Heroes' })
      const n = o.$unset('album')
      expect(o.album).toBe('Heroes')
      expect(n.album).toBeUndefined()
      expect(o).not.toBe(n)
    })

    it('should properly $unset numeric indexes', () => {
      const o = mewt({ foo: 'bar', 0: 'foo', 1: 'bar' })
      expect(o.$unset(0)).toEqual({ foo: 'bar', 1: 'bar' })
      expect(o.$unset(1)).toEqual({ foo: 'bar', 0: 'foo' })
    })
  })
})
