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
```
### npm start
```
$ cd myApp
$ npm start                 启动本地端口并打开demo (默认 chrome 浏览器)
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
###FAQ
**常见问题解答**

`1、openssl 不是内部或外部命令，也不是可运行程序或批处理文件。`
```
（1）需要安装 openSSL 下载地址： [点击进入下载页](http://slproweb.com/products/Win32OpenSSL.html)

（2）配置环境变量（系统变量=>path=>opensll安装根路径\bin）方便全局使用openssl命令

（3）测试是否安装成功 cmd -> openssl -> version 打开cmd输入openssl，切换到openssl,然后输入version 查看版本，如果成功打印说明安装成功！
```
 `2、npm start 报错：Caught exception:Error Command failed: C:\Windows\system32\cmd.exe /s /c t "" "chrome" "http:localhost:8989"`
```
 您需要安装 Chrome 浏览器
```
` 3、npm start 会弹出文件窗口`
```
 首次启动会弹出一个框，这里面是 openSSL 生成的证书 rootCA.crt，需要信任之后，就不会再弹框了。
```
`4、Error: EBUSY: resource busy or locked,...`
```
npm cache clean 清除一下缓存，不行就卸载重新安装
```