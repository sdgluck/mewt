let a = Array.isArray
let o = v => typeof v === 'object'
let k = v => a(v)
  ? Object.keys([...v]) // use spread to preserve holes in array
  : Object.keys(v)

/** @returns {Array|Object} */
let M = module.exports = (parent, targetPath = []) => {
  if (typeof parent !== 'object') {
    throw new Error('expect arr|obj')
  }

  // we re-use this in order to reduce the number of let declarations
  let multiPurpose

  let getOrSetTarget = (obj, value) => {
    multiPurpose = targetPath.length
    for (;multiPurpose > (value ? 1 : 0);) {
      obj = obj[targetPath[--multiPurpose]]
    }
    if (!value) return obj
    obj[targetPath[--multiPurpose]] = value
  }

  /*
  let getTarget = (obj) => {
    let pathClone = [...targetPath]
    let target = obj
    while (pathClone.length) {
      target = obj[pathClone.pop()]
    }
    return target
  }

  let setTarget = (obj, value) => {
    let pathClone = [...targetPath]
    let target = obj
    while (pathClone.length > 1) {
      target = obj[pathClone.pop()]
    }
    obj[pathClone.pop()] = value
  }
  */

  let target = getOrSetTarget(parent)
  let isTargetArray = a(target)

  let clone = (obj = parent) =>
    o(obj) ? k(obj).reduce((newObj, key) => (
      multiPurpose = obj[key],
      newObj[key] = a(multiPurpose)
        ? multiPurpose.map(clone)
        : o(multiPurpose)
          ? clone(multiPurpose)
          : multiPurpose,
      /*return*/newObj
    ), a(obj) ? [] : {}) : obj

  let mutationTrapError = () => {
    throw new Error((isTargetArray ? 'arr' : 'obj') + ' immutable')
  }

  let override = prop => (...args) => {
    let mutMethod = /reverse|sort|splice|fill|copyWithin/.test(prop)
    let nonMutMethod = /filter|map|concat|slice/.test(prop)

    let cl = nonMutMethod ? parent : clone()
    let res = getOrSetTarget(cl)[prop](...args)

    // final result
    multiPurpose = mutMethod || nonMutMethod ? M(res) : res

    return /push|pop|shift|unshift/.test(prop)
      ? [multiPurpose, M(cl)] : multiPurpose
  }

  if (!targetPath.length) {
    parent = k(parent).reduce((newObj, key) => (
      newObj[key] = o(target[key])
        ? M(parent, [...targetPath, key])
        : target[key],
      /*return*/newObj
    ), a(parent) ? [] : {})
  }

  return new Proxy(target, {
    get (_, prop) {
      let parentClone
      multiPurpose = getOrSetTarget(parent)
      return {
        $set (prop, val) {
          parentClone = clone()
          multiPurpose = getOrSetTarget(parentClone)
          multiPurpose[prop] = val
          return M(parentClone)
        },
        $unset (prop) {
          parentClone = clone()
          if (isTargetArray && !(prop % 1) && prop >= 0) {
            multiPurpose = [
              ...parentClone.slice(0, prop),
              ...parentClone.slice(prop + 1)
            ]
            if (targetPath.length) {
              getOrSetTarget(parentClone, multiPurpose)
              return M(parentClone)
            }
            return M(multiPurpose)
          }
          delete getOrSetTarget(parentClone)[prop]
          return M(parentClone)
        }
      }[prop] || multiPurpose[prop] && ({}.hasOwnProperty.call(multiPurpose, prop) ? multiPurpose[prop] : override(prop))
    },
    defineProperty: mutationTrapError,
    deleteProperty: mutationTrapError,
    setPrototypeOf: mutationTrapError
  })
}
