class windCache {
  constructor() {
    this.list = {}
  }

  set(key, value) {
    this.list[key] = value
    return true
  }

  get(key) {
    return this.list[key]
  }

  clear() {
    this.list = {}
    return true
  }

  setSync(key, value) {
    setTimeout(() => {
      this.list[key] = value
      return true
    }, 0)
  }
}
window.windCache = windCache
export default windCache
