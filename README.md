# webpack + vue 纯静态多页面解决方案
框架主要实现前端开发中最常用的基础功能，方便扩展。

## 主要功能
1. 自动刷新/热更新
2. 数据模拟

## todo (欢迎pr)
1. 单元测试
### 目录

```
├── src // 源码目录
│       │
│       ├── page // 页面目录
│       │       ├── app
│       │       │       ├── index.html
│       │       │       ├── index.js
│       │       │       ├── style.css
│       │       │       └── ...
│       │       ├── home
│       │       
│       ├── assert // 公共资源目录
│       │       └── font
│       │
│       ├── model // model层
│       │
│       ├── store // 数据管理层
│       │
│       ├── anything // 根据项目特征创建
│
│
├── dist // 构建目录
│       ├── app.html
│       ├── home.html
│       ├── runtime.bundle.js
│       └── ...
│
│     
├── script // npm 脚本
│       └── newpage.js
│
├── config // 配置
│       ├── webpack.prod.js
│       ├── webpack.dev.js
│       └── webpack.common.js
│
├── mock // 数据模拟
│       └── router.js
│
├── static // 非模块话资源，直接拷贝
│
├── test // 测试
│
├── node_modules // 生态
│


```
## 安装

```
$ npm i
    
```

## 开发/调试
```$xslt
$ npm run start
$ open http://localhost:8081/app.html
```

## 构建
```$xslt
$ npm run build
```

## 创建新页面
```$xslt
$ npm run new pageName
```

## 相对源码根目录引入模块
目前默认把源码根目录(src)加入到模块搜寻目录中
`webpack.common.js`
```js
{
  resolve: {
      modules: [srcRoot, "node_modules"]
    }
}

```
```js
import moduleA from 'widget/a'
import moduleB from 'widget/b'
```

## 数据模拟
`mock/router.js`下定义数据接口
```js
module.exports = function (app) {
  app.get('/data', function (req, res) {
    res.json({
      'data': 'hello webpack'
    })
  })
}
```
代理其他数据接口
```js
const request = require('request')
module.exports = function (app) {
  app.use('/api/', function(req, res) {
    let url = `http://localhost:3000/api${req.url}`
    req.pipe(request(url)).pipe(res)
  })
}

```
请求
```js
axios.get('/data').then(data => {
  console.log(data)
})
```
