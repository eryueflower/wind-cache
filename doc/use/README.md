# 使用文档

## 初始化

```js
import { WindCache } from 'wind-cache'

const winux = new WindCache()

winux.setStorageSync('name', '小明')
```

#### Constructor Options

```
WindCache(Options)
```

你可以在实例化 `WindCache` 的时候传递一个 Options，可用属性如下：

`isLasting` `[Boolean]`

标记是否为“常驻内存”，如果开启此项，`Wind Cache` 会在你每次 setStorage 的时候都持久化到硬盘，下一次刷新页面的时候将它读到内存，调用者会感受到它一直存在于内存中。

#### 持久化

```js
const winux = new ArrowCache({
  isLasting: true
})
```

## 设置

同步缓存

```js
winux.setStorageSync('name', '小明')
```

异步缓存

```js
winux.setStorage({ key: 'name', value: '小明' })
```

#### 设置过期时间

当设置的失效时间小于等于 30 天时，我们可以在 expires 属性后面直接输入 XX 天数

```js
winux.setStorageSync('name', '小明', {
  expires: 7
})
```

当设置的失效时间少于一天时：直接传一个时间戳.例如下面是设置 winux 的失效时间为 15 分钟

```js
winux.setStorageSync('name', '小明', {
  expires: 1000 * 60 * 15
})
```

## 获取

同步缓存

```js
winux.getStorageSync('name')
```

异步缓存

```js
winux.getStorage({
  key: 'agnamee',
  success: function(res) {
    console.log(res)
  }
})
```

### 使用默认值

为避免做一些冗余的非空判断，我们为个别方法提供了默认值，要是取不到值，将返回第二个参数。例如:

```js
// 👎
const doSomething = () => {
  const foo = winux.getStorageSync('foo')

  if (!foo) {
    winux.setStorageSync('foo', 0)
  }

  // ...
}

// 👍
const doSomething = () => {
  const foo = winux.getStorageSync('foo', 0)

  // ...
}
```

## 更新

`Wind Cache` 提供了一些更新缓存项的方法，`setStorageSync` 和 `updateContent`。我们称 `setStorageSync` 是有副作用的，而 `updateContent` 是没有副作用的，`setStorageSync` 在 `key` 对应的项不存在的时候会自动创建一个新的，而 `updateContent` 则会返回 `false` 并且不会自动创建。

```js
winux.updateContent('name', '小红')
```

## 列出缓存项

```js
winux.readAllStorage()
```

## 从本地缓存中移除指定 key

```js
winux.removeStorageSync('name')
```

## 清除全部缓存

```js
winux.clearStorage()
```

## Examples

一些例子在 [Examples](example) 下，通过 相关`README.md` 即可启动
