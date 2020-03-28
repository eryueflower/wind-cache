const oneDay = 1000 * 60 * 60 * 24 // 一天的时间戳

const nowTime = Date.now

const stagnateTime = 30 // 最长过期时间

function isObject(el) {
  return Object.prototype.toString.call(el) === '[object Object]'
}
function type(obj) {
  const { toString } = Object.prototype
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  return map[toString.call(obj)]
}

const deepClone = (data) => {
  const t = type(data)
  let o
  let i
  let ni

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (i = 0, ni = data.length; i < ni; i++) {
      // eslint-disable-line
      o.push(deepClone(data[i]))
    }
    return o
  }
  if (t === 'object') {
    /* eslint-disable */
    for (i in data) {
      o[i] = deepClone(data[i])
    }
    /* eslint-enable */
    return o
  }
  return data
}

export {
  oneDay, isObject, deepClone, stagnateTime, nowTime,
}
