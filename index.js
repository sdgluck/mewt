/** @returns {Array|Object} */
module.exports = function mewt (target) {
  let isA = Array.isArray(target)
    , multiRet = 'push pop shift unshift'
    , clone = (v, soft) => (v = isA ? [].concat(v) : Object.assign({}, v), soft ? v : mewt(v))

  let override = prop => (...args) => {
    let res = target[prop](...args)
    return multiRet.includes(prop) ? [res, clone(target)] : clone(res)
  }

  let newObj, api = {
    $set: (prop, val) => (newObj = clone(target, true), newObj[prop] = val, newObj),
    $unset: prop => (newObj = clone(target, true), delete newObj[prop], newObj)
  }

  if (!isA && typeof target !== 'object')
    throw new Error('mewt accepts array or object')

  return new Proxy(target, {
    set: () => {
      throw new Error(`${isA ? 'array' : 'object'} is immutable`)
    },
    get: (_, prop) => {
      if (api[prop]) return api[prop]
      return target[prop] && (target.hasOwnProperty(prop) ? target[prop] : override(prop))
    }
  })
}
