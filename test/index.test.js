import WC from '../src/index'
var cache = new WC()

test('设置缓存', () => {
  expect(cache.set('name', '小明')).toBe(true)
})

test('获取缓存', () => {
  expect(cache.get('name')).toBe('小明')
})
