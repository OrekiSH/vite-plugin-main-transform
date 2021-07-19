<h1 align="center">vite-plugin-main-transform</h1>

自动引入并将Vue组件注册为全局组件

<a href="https://github.com/OrekiSH/vite-plugin-main-transform/blob/main/README.md">English</a> | 简体中文

## Install

* 首先安装[vite v2.x](https://github.com/vitejs/vite)

* 接着安装插件

```bash
$ npm i -D vite-plugin-main-transform
# 或者
$ yarn add -D vite-plugin-main-transform
```

## 用法

配置Vite的vite.config.js文件

```js
// vite.config.js
import mainTransform from 'vite-plugin-main-transform'

export default {
  plugins: [
    mainTransform({
      transformer: (code, { fs, path, babel, dirname }) => {
        // read main.js and concat its content into main.js
        const mainFile = fs.readFileSync(path.resolve(dirname, 'src/main.js'))
        return `${code}\nconst main = \`${mainFile}\``
      }
    })
  ]
}
```

## 预览

![代码预览](https://z3.ax1x.com/2021/07/19/WJFYpd.png)

## 另一种用法

配置Vite的vite.config.js文件

```js
// vite.config.js
import mainTransform from 'vite-plugin-main-transform'

export default {
  plugins: [
    mainTransform({
      main: './src/main.ts',
      // 自动扫描文件，并引入和注册为全局组件
      includes: ['./src/components/**/*.vue', './src/components/**/*.tsx']
    })
  ]
}
```

如果`src/components`目录包含`foo.vue`与 `bar.tsx`, 以上述配置运行我们得到的结果为:

```js
// main.ts before
import Vue from 'vue';
```

```js
// main.ts after
import Vue from 'vue';
import foo from './foo.vue';
import bar from './bar.tsx';

Vue.component('foo', foo);
Vue.component('bar', bar);
```

## 配置

### `main`

类型: `String`<br>
默认值: `./src/main.js`

main.js文件相对于当前运行脚本的位置

### `include`

类型: `Array[...String]`<br>
默认值: `['./src/components/**/*.vue']`

声明一个[minimatch pattern](https://github.com/isaacs/minimatch)匹配模式的数组，指定插件应该操作的文件

### `transformer`

类型: `Function((code, { fs, path, babel, dirname }) => string)`<br>
默认值: `null`

源代码转换函数, 返回值为转换后的代码

### `semicolon`

类型: `Boolean`<br>
默认值: `true`

语句末尾是否添加分号

### `extension`

类型: `Boolean`<br>
默认值: `true`

导入文件是否保留文件后缀

### `quotes`

类型: `'single' | 'double'`<br>
默认值: `'single'`

导入文件使用单引号/双引号
