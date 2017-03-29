/** @returns {Array|Object} */
function mewt(target) {
  const multiRet = 'push pop shift unshift'
  const mutArrMethods = 'reverse sort splice fill copyWithin'
  const nonMutArrMethods = 'filter map concat slice'
  
  const isA = Array.isArray(target)
  const clone = isA ? v => [].concat(v) : v => Object.assign({}, v)

  const override = prop => (...args) => {
    const mutMethod = mutArrMethods.includes(prop)
    const nonMutMethod = nonMutArrMethods.includes(prop)

    const cl = nonMutMethod ? target : clone(target)
    const res = cl[prop](...args)
    const wrappedRes = (mutMethod || nonMutMethod) ? mewt(res) : res
    
    return multiRet.includes(prop) ? [wrappedRes, mewt(cl)] : wrappedRes
  }

  const api = {
    $set: (prop, val) => {
      const newObj = clone(target)
      newObj[prop] = val
      return mewt(newObj)
    },
    $unset: prop => {
      const newObj = clone(target)
      delete newObj[prop]
      return mewt(newObj)
    }
  }

  if (typeof target !== 'object' || !target) {
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

module.exports = mewt
