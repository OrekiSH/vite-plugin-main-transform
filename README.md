<h1 align="center">vite-plugin-main-transform</h1>

⚡️ A Vite plugin which works just like env property in Nuxt.js

English | <a href="https://github.com/OrekiSH/vite-plugin-main-transform/blob/main/README-zh_CN.md">简体中文</a>

## Install

* First of all, install [vite v2.x](https://github.com/vitejs/vite)

* Then install the plugin

```bash
$ npm i -D vite-plugin-main-transform
# OR
$ yarn add -D vite-plugin-main-transform
```

## Usage

Write vite config

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

## Preview

![code preview](https://z3.ax1x.com/2021/07/19/WJFYpd.png)

## Another usage

Write vite config

```js
// vite.config.js
import mainTransform from 'vite-plugin-main-transform'

export default {
  plugins: [
    mainTransform({
      main: './src/main.ts',
      // auto scan files,  import and regsiter components.
      includes: ['./src/components/**/*.vue', './src/components/**/*.tsx']
    })
  ]
}
```

If `src/components` contains file `foo.vue` and `bar.tsx`, run with the config above, the result is:

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

## Options

### `main`

Type: `String`<br>
Default: `./src/main.js`

Script path to be transformed

### `transformer`

Type: `Function((code, { fs, path, babel, dirname }) => string)`<br>
Default: `null`

code transformer function, the return value is the code transformed

### `include`

Type: `Array[...String]`<br>
Default: `['./src/components/**/*.vue']`

An array of [minimatch patterns](https://github.com/isaacs/minimatch), which specifies the files in the build the plugin should operate on. By default all files are targeted.


### `semicolon`

Type: `Boolean`<br>
Default: `true`

Add semicolon at the end of lines or not.

### `extension`

Type: `Boolean`<br>
Default: `true`

Keep file extension for import file or not.

### `quotes`

Type: `'single' | 'double'`<br>
Default: `'single'`

Single or double quotes around import file path.
