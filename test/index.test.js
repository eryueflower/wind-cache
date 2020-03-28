import WindCache from '../src/index.js'
let winux = new WindCache()
test('同步设置缓存', () => {
  expect(winux.setStorageSync('name', '小明')).toBeTruthy()
})

test('设置缓存过期时间', () => {
  expect(
    winux.setStorageSync(
      'Fruits',
      {
        Apple: 2,
        orange: 3
      },
      {
        expires: 1000 * 60 * 2
      }
    )
  ).toBeTruthy()

  expect(
    winux.setStorageSync('Fruits1', 'orange', {
      expires: 1000 * 60 * 2
    })
  ).toBeTruthy()
})

test('同步获取缓存', () => {
  expect(winux.getStorageSync('name')).toBe('小明')
})

test('异步设置缓存', () => {
  expect(winux.setStorage({ key: 'age', value: 19 })).toBeFalsy()
})

test('异步获取缓存', () => {
  winux.getStorage({
    key: 'age',
    success: function(res) {
      expect(res).toBe(false)
    }
  })
})

test('更新缓存', () => {
  expect(winux.updateContent('name', '小红')).toBeTruthy()
  expect(winux.updateContent('name1', '小红')).toBeFalsy()
  expect(winux.updateContent('Fruits1', 'Apple')).toBeTruthy()
})

test('获取更新', () => {
  expect(winux.getStorageSync('Fruits1')).toBe('Apple')
  winux.getStorage({
    key: 'Fruits1',
    success: function(res) {
      expect(res).toBe('Apple')
    }
  })
})

test('不存在key时同步获取缓存', () => {
  expect(winux.getStorageSync('name1', 1)).toBe(1)
  expect(winux.getStorageSync('name1', 2)).toBe(2)
})

test('删除某个key', () => {
  expect(winux.setStorageSync('count', 20)).toBeTruthy()
  expect(winux.removeStorage('count')).toBeTruthy()
})

test('清空缓存', () => {
  expect(winux.clearStorage()).toBeFalsy()
})
