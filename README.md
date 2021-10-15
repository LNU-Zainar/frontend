# 「在哪」 PC网站
> 本项目使用Vue.js官方提供的[Vue CLI](https://cli.vuejs.org/zh/)脚手架工具构建，项目代码基于[Vue 2](https://cn.vuejs.org/v2/guide/)框架编写，界面UI基于[Element UI](https://element.eleme.cn/#/zh-CN/component/installation)实现。

## 搭建开发环境
#### 第一步、安装node.js
1. 打开node.js官网的[下载链接](https://nodejs.org/en/download/current/)，下载`current`最新版。
2. 安装完成后，打开终端软件，执行以下命令来验证是否安装成功：
```
node -v
```
#### 第二步、安装cnpm工具
因为国内网络环境的问题，使用官方自带的npm包管理器安装依赖包时可能会很慢或者失败，所以推荐安装淘宝提供的[cnpm包管理器](https://www.npmjs.com/package/cnpm)。   
打开终端执行（请注意需要超级管理员权限）：
```
npm install cnpm -g --registry=https://registry.npmmirror.com
```
等待安装过程走完之后，执行以下命令来验证是否安装成功：
```
cnpm -v
```
#### 第三步、安装Vue CLI
打开终端执行以下命令（请注意需要超级管理员权限）：
```
cnpm install -g @vue/cli
```
等安装进度走完之后，可以用这个命令来检查其版本是否正确：
```
vue --version
```
## 启动项目
### 安装项目依赖包
第一次将项目代码克隆到本地之后，需要安装一次所有的依赖包：
```
cnpm install
```

### 启动开发服务
```
npm run serve # 或cnpm run serve 
```

### 构建生产环境代码
```
npm run build # 或cnpm run serve 
```

### 运行代码检查
```
npm run lint # 或cnpm run serve 
```

## IDE环境配置
如果使用VS Code的话，可以安装`Vetur`扩展程序，该扩展程序可以支持Vue项目文件的语法高亮。   
推荐使用VS Code编辑器，下载地址请[访问官网](https://code.visualstudio.com)。