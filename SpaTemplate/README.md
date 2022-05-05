## 企业级项目搭建

<p align="center">
  <a><img src="https://img.shields.io/badge/view-Documentation-blue?style=for-the-badge" /></a>
</p>

<p align="center">
  <a><img src="https://img.shields.io/travis/rust-lang/rust/master.svg#alt=Travis%20branch" /></a>&nbsp;&nbsp;&nbsp;&nbsp;<a><img src="https://img.shields.io/packagist/l/doctrine/orm.svg#alt=Packagist" /></a>&nbsp;&nbsp;&nbsp;&nbsp; <a><img src="https://img.shields.io/scrutinizer/coverage/g/phpmyadmin/phpmyadmin/master.svg#alt=Scrutinizer%20branch" /></a>&nbsp;&nbsp;&nbsp;&nbsp;
</p>

### Introduction

> Use vite to customize the build your Vue3&TypeScript company project  
> 初始化项目基于脚手架工具 `Vite`搭建,技术框架`Vue3`并使用`TypeScript`语言开发,其他使用核心技术如: `Vue-Router + vite-plugin-pages` `Pinia`.

### Basic Build Lib

[![Made with Node.js](https://img.shields.io/badge/Node.js->=12-blue?logo=node.js&logoColor=white)](https://nodejs.org "Go to Node.js homepage") &nbsp;
[![Made with Yarn](https://img.shields.io/badge/Yarn->=1-blue?logo=yarn&logoColor=white)](https://yarnpkg.com/ "Go to Yarn homepage") &nbsp;
[![Made with Vite](https://img.shields.io/badge/Yarn->=2-violet?logo=vite&logoColor=white)](https://cn.vitejs.dev/ "Go to Vite homepage") &nbsp;
[![Made with TypeScript](https://img.shields.io/badge/TypeScript-4-blue?logo=typescript&logoColor=white)](https://typescriptlang.org "Go to TypeScript homepage") &nbsp;
[![Made with Vue](https://img.shields.io/badge/Vue-3-blue?logo=vue.js&logoColor=green)](https://v3.vuejs.org "Go to Vue homepage") &nbsp;

### Using Tools

![Less](https://img.shields.io/badge/less-2B4C80?style=for-the-badge&logo=less&logoColor=white) &nbsp;
![Windicss](https://img.shields.io/badge/windicss-48B0F1.svg?style=for-the-badge&logo=windi-css&logoColor=white) &nbsp;
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) &nbsp;


### Install & Use

```shell
yarn
```

#### Compiles and hot-reloads for development

```shell
yarn run dev
```

#### Compiles and minifies for production

```shell
yarn run build (for production)
yarn run build:test (for pre)
```

#### Run unit test

```shell
yarn run test:unit
```

#### Lints and fixes files

```shell
yarn run lint:eslint
yarn run lint:stylelint
```

#### Remove cache/lib and ReIntsall

```shell
yarn run reinstall
```

### Standard

#### 文件或文件夹命名

> 新建文件或目录命名统一采取驼峰命名，例如 editorPlus.

#### 样式

> 1、样式命名统一采取中划线方式，例如 class-**\*-**.
> 2、基础样式已配置到全局,如果有新添加的内容可以按模块添加文件夹或补充到文件中,当前对 ant, transition,通用变量添加.

#### Iconfont 图标

> 项目中尽量使用字体图标,图标上传到 [阿里巴巴 iconfont](https://www.iconfont.cn/manage/index),**上传成功后刷新并替换 index.html 中链接**.

#### store

> 项目中默认已经部署 Pinia,新模块创建时需要创建文件夹和子文件`***.ts`,使用时仅需高如该模块即可.
> 建议在项目中可以尝试`reactive ref `替代 `Pinia`.

#### router
> 项目基于`File Base URL`因此无需手动新建路由，但必须要注意在**pages目录下新建文件子文件只能是index.vue**


#### 埋点与接口日志

> 暂不接入,作为 fix 版本接入,接入后补充文档

### Project Tree

![项目结构](./Vite&TS脚手架.png)

```

e-card-business
├─ .editorconfig
├─ .env   —环境配置文件 
├─ .env.development
├─ .env.production
├─ .env.test
├─ .eslintignore
├─ .eslintrc.js
├─ .husky  — git hook
│  ├─ _
│  │  └─ husky.sh
│  ├─ commit-msg
│  ├─ common.sh
│  └─ pre-commit
├─ .prettierignore
├─ .prettierrc
├─ .stylelintignore
├─ README.md
├─ build  — 打包配置文件 
│  ├─ config
│  │  └─ themeConfig.ts
│  ├─ constant.ts
│  ├─ generate
│  │  └─ generateModifyVars.ts
│  ├─ getConfigFileName.ts
│  ├─ index.ts
│  └─ script
│     ├─ buildChunk.ts
│     ├─ buildConf.ts
│     └─ buildServer.ts
├─ commitlint.config.js
├─ index.html
├─ jest.config.js
├─ mock —接口mock配置文件 
│  ├─ _createProductionServer.ts
│  └─ index.ts
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ favicon.ico
│  └─ resource
│     └─ img
│        └─ logo.png
├─ src
│  ├─ App.vue
│  ├─ assets     — 静态资源 
│  │  ├─ fonts
│  │  ├─ images
│  │  │  └─ logo.png
│  │  └─ svg
│  ├─ components    — 公共组件  
│  │  └─ camcard
│  │     └─ index.vue
│  ├─ constants     — 常量及枚举类型 
│  │  ├─ enum.ts
│  │  └─ index.ts
│  ├─ env.d.ts
│  ├─ hooks          —hook钩子函数 
│  │  └─ useMessage.tsx
│  ├─ i18n           —多语言
│  │  ├─ en-US.json
│  │  └─ zh-CN.json
│  ├─ layouts
│  │  └─ default.vue
│  ├─ main.ts
│  ├─ pages         —页面，FIle Base Router
│  │  ├─ editor
│  │  │  ├─ index.less
│  │  │  └─ index.vue
│  │  ├─ index.vue
│  │  ├─ login
│  │  │  ├─ index.less
│  │  │  └─ index.vue
│  │  └─ pay
│  │     └─ index.vue
│  ├─ router       —基础路由配置
│  │  └─ index.ts
│  ├─ services
│  │  ├─ auth.ts
│  │  └─ index.ts
│  ├─ store        —状态管理
│  │  ├─ index.ts
│  │  └─ modules
│  │     ├─ auth
│  │     │  └─ index.ts
│  │     └─ login
│  ├─ styles    —常用样式配置
│  └─ utils     —工具配置
│     ├─ axios  —axios封装
│     ├─ dom    —dom操作
│     ├─ env.ts
│     ├─ file   —文件系统操作
│     ├─ flog   —埋点及日志操作
│     ├─ is.ts  —常用判断类型工具
│     └─ log.ts —console封装
├─ stylelint.config.js
├─ test      —单元测试
├─ tsconfig.json
├─ tsconfig.node.json
├─ types       —全局类型声明
├─ vite.config.ts
├─ windi.config.ts     — windicss配置
└─ yarn.lock
```


### Support Feature

- [x] 支持`Pinia`状态管理;
- [x] 支持`vue3 API`，`Image`自动导入，也可以手动配置全局或部分文件夹的组件自定义导入；
```js
**使用前提：** 安装`vue-global-api`并配置`.eslintrc.js `->`extends:[‘vue-global-api’]`

const test = ref(10)
onMounted(() => {
  console.log('mounted===')
})
**组件自定义导入：**
Components({
   ...,
   resolvers: [
     name => {
         // where `name` is always CapitalCase
         if (name.startsWith('App')) {
             return { importName: 'default', path: `./components/$                {kebabCase(name)}/index.vue` }
         }
     }
   ]
})

......
```
- [x] 基于`Vue-Router`,使用`vite-plugin-pages`实现`File Base Router`；
- [x] 支持`TSX`语法;
- [x] 支持`axios`, 二次封装完成;
- [x] 支持`jest`单元测试；
- [x] 支持`Mock`数据;
- [x] 支持`i18n` 国际化,全局配置完成;
- [x] 支持`dayjs`,日期格式化;
- [x] 支持`lodash`,全局注入防抖与节流;
- [x] 支持`Less`;
- [x] 支持`windicss`，优势是大多数情况无需额外编写css文件;
- [x] 支持`ant-desgin-vue`,样式自动导入，UI 组件已按需加载, 特殊的如**message 等非组件化模块**样式仍需手动注入;
- [x] 支持`styleLint`,`eslint`,`prettier`，语法检查;
- [x] 支持命令行工具`cross_env`(设置脚本变量),`rimraf`, `dotenv`(将环境变量加载到 process.env),配合`vite .env.**`对不同环境作区分;
- [x] 支持 `Git Hook`(`husky`),脚本支持 `lint-stage` 检查;
- [x] 支持`esno`,基于 esbuild 的 TS/ESNext node 运行时;


### GIT 规范

#### Pull Request

> 项目对 git 流程做强制规范

1. checkout 分支: git checkout -b feature/xxxx
2. commit 提交: git commit -m 'feature: add xxxxx'

#### Reference

- master 生产环境分支
- pre 预发环境分支
- daily 公共日常开发分支(daily/1.0.0)
- bugfix 修复 bug
- feature 新增功能

### Use Suggestion

- JSX 模块导出支持,语法使用建议参考[Babel Plugin JSX](https://github.com/vuejs/babel-plugin-jsx)

```js
import { defineComponent } from 'vue'

// named exports w/ variable declaration: ok
export const Foo = defineComponent({})

// named exports referencing variable declaration: ok
const Bar = defineComponent({ render() { return <div>Test</div> }})
export { Bar }

// default export call: ok
export default defineComponent({ render() { return <div>Test</div> }})

// default export referencing variable declaration: ok
const Baz = defineComponent({ render() { return <div>Test</div> }})
export default Baz
```

- 新建或添加文件后,通过`project-tree`更新项目结构树

### Other

- `vscode`推荐安装 `Vue Language Features (Volar)`和 `EditorConfig for VS Code`
- `vscode`推荐安装 `project-tree`
- `vscode`推荐安装`WindiCSS`

### 主要技术库文档

- [Vite](https://cn.vitejs.dev)
- [Vue3](https://v3.cn.vuejs.org/guide/introduction.html)
- [TypeScript](https://www.tslang.cn/docs/home.html)
- [ant-design-vue](https://www.antdv.com/components/overview)
- [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)
- [Pinia](https://pinia.vuejs.org)
- [MockJS](http://mockjs.com/)
- [lodash-es](https://www.lodashjs.com)

### 相关文档参考

- [setup\Composition](https://juejin.cn/post/7006108454028836895)
- [使用 reactive ref 替代 VUEX 状态管理](https://juejin.cn/post/6984215082532093965)
- [JSX 开发 Vue3](https://juejin.cn/post/6911175470255964174)
- [husky](https://zhuanlan.zhihu.com/p/366786798)
- [mac brew 安装](https://zhuanlan.zhihu.com/p/453313557)


#### Next Todo
- [ ] npm package publish
- [ ] 加入日志系统
