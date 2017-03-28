const multiRet = ['push', 'pop', 'shift', 'unshift']

/** @returns {Array|Object} */
module.exports = function mewt(target) {
  const isA = Array.isArray(target)
  const clone = isA ? v => [].concat(v) : v => Object.assign({}, v)

  const override = prop => (...args) => {
    const cl = clone(target)
    const res = cl[prop](...args)
    return multiRet.includes(prop) ? [res, cl] : res
  }

  const api = {
    $set: (prop, val) => {
      const newObj = clone(target)
      newObj[prop] = val
      return newObj
    },
    $unset: prop => {
      const newObj = clone(target)
      delete newObj[prop]
      return newObj
    }
  }

  if (!isA && typeof target !== 'object') {
    throw new Error('mewt accepts array or object')
  }

  return new Proxy(target, {
    set: () => {
      throw new Error(`${isA ? 'array' : 'object'} is immutable`)
    },
    get: (_, prop) => {
      if (api[prop]) {
        return api[prop]
      }
      return target[prop] && ({}.hasOwnProperty.call(target, prop) ? target[prop] : override(prop))
    }
  })
}
