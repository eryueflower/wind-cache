import {
  isObject, oneDay, nowTime, deepClone, stagnateTime,
} from './lib/util'

export default class WindCache {
  isLasting = false

  constructor(Options) {
    this.list = {}
    if (!WindCache.instance) {
      WindCache.instance = this
      if (Options && Options.isLasting) {
        this.isLasting = true
        this.setWindux = localStorage.setItem.bind(localStorage, 'winux')
        this.getWindux = localStorage.getItem.bind(localStorage, 'winux')
      }
      this.init()
    }
    return WindCache.instance
  }

  init() {
    const isP = this.isLasting
    this.updateContent(isP)
    this.readAllStorage(isP)
    this.removeStorage(isP)
    this.clearStorage(isP)
    this.setStorageSync(isP)
    this.getStorageSync(isP)
    isP && this.treeShaking()
  }

  treeShaking() {
    const data = this._FormatData('get')()
    const initData = deepClone(data)
    for (const key in data) {
      const el = data[key]
      if (isObject(el) && 'expires' in el) {
        const { expires, startTime } = el
        const time1 = oneDay * expires + startTime
        const time2 = expires + startTime
        const expireTime = expires <= stagnateTime ? time1 : time2
        if (expireTime < nowTime()) {
          delete data[key]
        }
        delete initData[key]
      }
    }
    this.list = initData
    this._FormatData('set')(data)
  }

  // 同步版本
  setStorageSync = (isP) => {
    if (isP) {
      return (this.setStorageSync = (key, value, options) => {
        if (options && isObject(options)) {
          value = WindCache._setHandler(value, options)
        } else {
          this.list[key] = value
        }
        const data = this._FormatData('get')()
        data[key] = value
        this._FormatData('set')(data)
        return true
      })
    }
    return (this.setStorageSync = (key, value) => {
      this.list[key] = value
      return true
    })
  }

  // 异步调用
  setStorage = (field) => {
    const cb = () => {
      const { key, value, Options } = field
      this.setStorageSync(key, value, Options)
    }
    setTimeout(cb, 0)
  }

  updateContent = (isP) => {
    if (isP) {
      return (this.updateContent = (key, value) => {
        const data = this._FormatData('get')()
        if (key in data) {
          const el = data[key]
          if (isObject(el) && 'expires' in el) {
            const { expires, startTime } = el
            const expireTime = expires <= stagnateTime
              ? oneDay * expires + startTime
              : expires + startTime
            if (expireTime < nowTime()) {
              delete data[key]
              return false
            }
            el.value = value
            data[key] = el
            this._FormatData('set')(data)
            return true
          }
          data[key] = value
          this.list[key] = value
          this._FormatData('set')(data)
          return true
        }
        return false
      })
    }
    return (this.updateContent = (key, value) => {
      if (key in this.list) {
        this.list[key] = value
        return true
      }
      return false
    })
  }

  getStorageSync = (isP) => {
    if (isP) {
      return (this.getStorageSync = (key, rep) => {
        if (this.list[key]) {
          return this.list[key]
        }
        const data = this._FormatData('get')()
        if (isObject(data[key])) {
          return this._getHandler(data, key)
        }
        return data[key] || rep
      })
    }
    return (this.getStorageSync = (key, rep) => this.list[key] || rep)
  }

  getStorage = (field) => {
    const cb = () => {
      const { key, rep, success } = field
      const data = this.getStorageSync(key, rep)
      success && data && success(data)
    }
    setTimeout(cb, 0)
  }

  removeStorage = (isP) => {
    if (isP) {
      return (this.removeStorage = (key) => {
        const data = this._FormatData('get')()
        delete data[key]
        delete this.list[key]
        this._FormatData('set')(data)
        return true
      })
    }
    return (this.removeStorage = (key) => {
      delete this.list[key]
      return true
    })
  }

  clearStorage = (isP) => {
    if (isP) {
      return (this.clearStorage = () => {
        this.list = {}
        localStorage.removeItem('winux')
      })
    }
    return (this.clearStorage = () => {
      this.list = {}
    })
  }

  readAllStorage = (isP) => {
    if (isP) {
      return (this.readAllStorage = () => this._FormatData('get')())
    }
    return (this.readAllStorage = () => this.list)
  }

  _getHandler(data, key) {
    const value = data[key]
    if ('expires' in value) {
      const { expires, startTime } = value
      const expireTime = expires <= stagnateTime
        ? oneDay * expires + startTime
        : expires + startTime
      console.log('过期时间', new Date(expireTime))
      if (expireTime > nowTime()) {
        return value.value
      }
      delete data[key]
      this._FormatData('set')(data)
      return null
    }
    return value
  }

  static _setHandler(val, options) {
    if (options.expires === 0) {
      throw new Error('expires不能为 0 ')
    }
    if (!options.expires) {
      throw new Error('expires缺失或者为空')
    }
    const data = {
      value: val,
      startTime: nowTime(),
      expires: options.expires,
    }
    return data
  }

  _FormatData(handle) {
    const func = {
      get: (key) => {
        const cache = this.getWindux()
        if (cache) {
          const res = JSON.parse(cache)
          return key ? res[key] : res
        }
        return key ? this.list[key] : this.list
      },
      set: (data) => {
        this.setWindux(JSON.stringify(data))
      },
    }
    return func[handle]
  }
}
