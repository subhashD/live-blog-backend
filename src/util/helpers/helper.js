const config = require('../../config')
const GenericError = require('../../util/errors/GenericError')

class Helper {
  static isEmpty(value) {
    let bool =
      value == null ||
      (typeof value === 'string' && value.length === 0) ||
      (Helper.isArray(value) && value.length === 0)

    if (typeof value === 'object') {
      for (let key in value) {
        if (value.hasOwnProperty(key)) return false
      }
      return true
    }

    return bool
  }

  static isNull(value) {
    return value === null
  }

  static getQueryParamsString(paramsObj = {}) {
    let parts = []
    for (var i in paramsObj) {
      if (paramsObj.hasOwnProperty(i)) {
        parts.push(
          encodeURIComponent(i) + '=' + encodeURIComponent(paramsObj[i])
        )
      }
    }
    return '?' + parts.join('&')
  }

  static isInt(n) {
    return Number(n) === n && n % 1 === 0
  }

  static isFloat(n) {
    return Number(n) === n && n % 1 !== 0
  }

  static isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  static isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]'
  }

  static isString(value) {
    return typeof value === 'string'
  }

  static isError(value) {
    return value instanceof Error
  }

  static isFunction(value) {
    return typeof value === 'function'
  }

  static isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]'
  }

  static uniq(array) {
    const seen = new Set()
    return array.filter((item) => {
      if (seen.has(item)) {
        return false
      } else {
        seen.add(item)
        return true
      }
    })
  }

  static getObjProp(obj, path, defaultValue = null) {
    if (!Array.isArray(path)) {
      path = path
        .replace(/\[(\w+)\]/g, '.$1')
        .replace(/^\./, '')
        .split('.')
    }

    let result = obj
    for (let i = 0; i < path.length; i++) {
      if (result === null || result === undefined) {
        return defaultValue
      }
      result = result[path[i]]
    }

    return result === undefined ? defaultValue : result
  }
}

module.exports = Helper
