#dvantd-cli
基于dva和antd的脚手架安装指令

##Install
您需要全局安装，然后使用命令行工具安装dva和antd
```
$ npm install dvantd-cli -g
```

## Usage
### dva init
```bash
$ mkdir myApp && cd myApp
$ dva init
```
### dva new
```bash
$ dva new myApp
$ cd myApp
```
##Package.json script
```
(1) npm run build: 删除旧的lib 文件，编译新的lib文件
(2) rimraf lib: 删除目录下的lib 文件，Windows系统使用 rm -rf（Unix语法）需要安装 rimraf 命令需要全局安装 npm install rimraf -g，作用是删除文件
(3) babel src --out-dir lib: 将src文件下的代码通过 babel 转义将 es6 转义成 es5 词法并输出到 lib 文件夹中，进而让 node 支持 es6 语法
```