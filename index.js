/** @returns {Array|Object} */
module.exports = function m (target) {
  let multiRet = 'push pop shift unshift'
  let mutArrMethods = 'reverse sort splice fill copyWithin'
  let nonMutArrMethods = 'filter map concat slice'
  let mutationTraps = ['setPrototypeOf', 'defineProperty', 'deleteProperty']

  let isA = Array.isArray(target)
  let clone = isA ? v => [...v] : v => Object.assign({}, v)

  let mutationTrapError = (isA) => {
    throw new Error(`${isA ? 'arr' : 'obj'} is immutable`)
  }

  let override = prop => (...args) => {
    let mutMethod = mutArrMethods.includes(prop)
    let nonMutMethod = nonMutArrMethods.includes(prop)

    let cl = nonMutMethod ? target : clone(target)
    let res = cl[prop](...args)
    let wrappedRes = (mutMethod || nonMutMethod) ? m(res) : res

    return multiRet.includes(prop) ? [wrappedRes, m(cl)] : wrappedRes
  }

  let api = {
    $set (prop, val) {
      let newObj = clone(target)
      newObj[prop] = val
      return m(newObj)
    },
    $unset (prop) {
      if (isA && Number.isInteger(prop) && prop >= 0) {
        return m(target.slice(0, prop).concat(target.slice(prop + 1)))
      }
      let newObj = clone(target)
      delete newObj[prop]
      return m(newObj)
    }
  }

  if (typeof target !== 'object' || !target) {
    throw new Error('mewt accepts array or object')
  }

  let proxyHandler = {
    get: (_, prop) => {
      return api[prop] || (target[prop] && ({}.hasOwnProperty.call(target, prop) ? target[prop] : override(prop)))
    }
  }

  mutationTraps.forEach((key) => {
    proxyHandler[key] = mutationTrapError
  })

  target = (function df (o) {
    let it = isA ? Object.keys : Object.getOwnPropertyNames
    return it(isA ? [...o] : o).reduce((no, k) => {
      let v = o[k]
      if (v && typeof v === 'object') no[k] = m(v)
      else no[k] = v
      return no
    }, isA ? [] : {})
  })(target)

  return new Proxy(target, proxyHandler)
}
