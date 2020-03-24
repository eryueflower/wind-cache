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
}
window.windCache = windCache
export default windCache
