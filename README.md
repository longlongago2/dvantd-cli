#dvantd-cli
基于dva和antd的脚手架安装指令

##Install
您需要全局安装，然后使用命令行工具安装dva和antd
```
$ npm install dvantd-cli -g
```

## Usage
### dvantd init
```bash
$ mkdir myApp && cd myApp   创建并转到文件夹
$ dvantd init               安装dva 和 antd 并搭建脚手架
$ dvantd init --demo        安装demo
```
### dvantd new
```bash
$ dvantd new myApp          直接创建工程文件并安装 dva 和 antd 脚手架
$ dvantd new myApp --demo   安装demo
$ cd myApp
```
##Package.json script
```
(1) npm run build:
删除旧的lib 文件，编译新的lib文件

(2) rimraf lib:
删除目录下的 lib 文件，Windows 系统使用 rm -rf（Unix语法）
需要安装 rimraf 命令，全局安装 npm install rimraf -g，
然后使用 rimraf 命令删除文件

(3) babel src --out-dir lib:
将src文件下的代码通过 babel 转义，将 es6 转义成 es5 词法
并输出到 lib 文件夹中，进而让 node 支持 es6 语法
```