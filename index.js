/** Create immutable instance of array or object.
 *  @returns {Array|Object} */
module.exports = function mewt (target) {
  let current = target
    , isArr = Array.isArray(target)
    , multiRet = 'push pop shift unshift'
    , clone = v => isArr ? [].concat(v) : Object.assign({}, v)

  let override = fn => (...args) => {
    let res = current[fn](...args)
    current = clone(current)
    return multiRet.includes(fn) ? [res, current] : current
  }

  if (!isArr && typeof target !== 'object')
    throw new Error('mewt accepts array or object')

  return new Proxy(target, {
    set: (_, prop, val) => (current = clone(current), current[prop] = val, true),
    get: (_, prop) => current[prop] && (current.hasOwnProperty(prop) ? current[prop] : override(prop))
  })
}
