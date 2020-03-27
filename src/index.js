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
        this.list = this._FormatData('get')
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
  }

  // 同步版本
  setStorageSync = (isP) => {
    if (isP) {
      return (this.setStorageSync = (key, value) => {
        const data = this._FormatData('get')
        data[key] = value
        this._FormatData('set', data)
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
      const { key, value } = field
      this.setStorageSync(key, value)
    }
    setTimeout(cb, 0)
  }

  updateContent = (isP) => {
    if (isP) {
      return (this.updateContent = (key, value) => {
        const data = this._FormatData('get')
        if (key in data) {
          data[key] = value
          this._FormatData('set', data)
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
        const data = this._FormatData('get')
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
        const data = this._FormatData('get')
        delete data[key]
        this._FormatData('set', data)
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
      return (this.readAllStorage = () => this._FormatData('get'))
    }
    return (this.readAllStorage = () => this.list)
  }

  _FormatData(handle, data) {
    if (handle === 'get') {
      const cache = this.getWindux()
      if (cache) {
        return JSON.parse(cache)
      }
      return this.list
    }
    if (handle === 'set') {
      this.setWindux(JSON.stringify(data))
    }
  }
}
