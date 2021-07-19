import type { RegisterOptions } from 'babel-plugin-vue-components';
import type { PlatformPath } from 'path';
import fs from 'fs';
import * as babel from '@babel/core';

const path = require('path');
const process = require('process');
const VueComponentsPlugin = require('babel-plugin-vue-components');

export interface MainTransformOptions extends RegisterOptions {
  transformer?: (code: string, dep?: TransformerDep) => string;
}

export interface TransformerDep {
  fs: typeof fs;
  babel: typeof babel;
  path: PlatformPath;
  dirname: string;
}

export default function transform(options: MainTransformOptions) {
  const {
    transformer,
    main = './src/main.js',
    include,
    semicolon,
    extension,
    quotes,
  } = options || {};
  const dirname = process.cwd();
  const mainPath = path.join(dirname, main);

  return {
    name: 'vite-plugin-main-transform',
    transform(code: string, id: string) {
      if (id === mainPath) {
        // custom transformer, 自定义转换函数
        if (typeof transformer === 'function') {
          return transformer(code, {
            fs,
            path,
            babel,
            dirname,
          });
        }

        if (Array.isArray(include)) {
          // register gloabl components, 注册全局组件
          const includePath = include.map((e) => path.resolve(dirname, e));
          const { code: transformCode } = babel.transform(code, {
            plugins: [
              [VueComponentsPlugin, {
                main: mainPath,
                include: includePath,
                semicolon,
                extension,
                quotes,
              }],
            ],
            configFile: false,
            babelrc: false,
          }) || {};

          return transformCode;
        }
      }

      return code;
    },
  };
}
