/** @returns {Array|Object} */
function mewt (target) {
  const isA = Array.isArray(target)
  const clone = isA ? v => [...v] : v => Object.assign({}, v)

  const mutationTrapError = () => {
    throw new Error(`${isA ? 'array' : 'object'} is immutable`)
  }

  const override = prop => (...args) => {
    const multiRet = 'push pop shift unshift'.includes(prop)
    const mutMethod = 'reverse sort splice fill copyWithin'.includes(prop)
    const nonMutMethod = 'filter map concat slice'.includes(prop)

    const cl = nonMutMethod ? target : clone(target)
    const res = cl[prop](...args)
    const wrappedRes = (mutMethod || nonMutMethod) ? mewt(res) : res

    return multiRet ? [wrappedRes, mewt(cl)] : wrappedRes
  }

  const api = {
    $set (prop, val) {
      const newObj = clone(target)
      newObj[prop] = val
      return mewt(newObj)
    },
    $unset (prop) {
      if (isA && Number.isInteger(prop) && prop >= 0) {
        return mewt([
          ...target.slice(0, prop),
          ...target.slice(prop + 1)
        ])
      }
      const newObj = clone(target)
      delete newObj[prop]
      return mewt(newObj)
    }
  }

  if (typeof target !== 'object' || !target) {
    throw new Error('mewt accepts array or object')
  }

  target = clone(target)

  return new Proxy(target, {
    get (_, prop) {
      return api[prop] || (target[prop] && ({}.hasOwnProperty.call(target, prop) ? target[prop] : override(prop)))
    },
    defineProperty: mutationTrapError,
    deleteProperty: mutationTrapError,
    setPrototypeOf: mutationTrapError
  })
}

module.exports = mewt
