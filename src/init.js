import { join, basename } from 'path';         // nodeJs 内置模块
import { renameSync } from 'fs';               // nodeJs 内置模块
import { sync as emptyDir } from 'empty-dir';  // 安装模块：
import vfs from 'vinyl-fs';                    // 安装模块：描述指定路径下的指定文件的信息
import through from 'through2';                // 安装模块：
import { info, error, success } from './log';  // 开发模块：控制台打印信息的颜色

// 通过program传入两个参数 --demo --no-install
function init({ demo, install }) {
    const type = demo ? 'demo' : 'app';  // 安装类型
    const cwd = join(__dirname, '../boilerplates', type); // 脚手架设置和拷贝，boilerplates有两个脚手架文件，根据参数选择安装哪个,(可以自定义自己喜欢的脚手架，命名为app 或 demo)
    const dest = process.cwd();          // 是当前执行node命令时候的文件夹地址
    const projectName = basename(dest);  // 提取出用 ‘/' 隔开的path的最后一部分，即当前文件名

    // 安装之前判断当前文件夹是否可以正常安装
    if (!emptyDir(dest)) {
        error('此文件夹已存在文件, 请在一个空文件夹下运行初始化命令！');
        process.exit(1);
    }
    // 正常安装提示
    console.log();
    console.log(`正在创建一个新的 Dva ${type} ，安装路径：${dest}.`);
    console.log();

    vfs.src(['**/*', '!node_modules/**/*'], { cwd: cwd, cwdbase: true, dot: true })
        .pipe(template(dest, cwd))
        .pipe(vfs.dest(dest))
        .on('end', function () {
            info('rename', 'gitignore -> .gitignore');
            renameSync(join(dest, 'gitignore'), join(dest, '.gitignore'));
            if (install) {
                info('run', 'npm install');
                require('./install')(printSuccess);
            } else {
                printSuccess();
            }
        })
        .resume();

    function printSuccess() {
        success(`
        
Success! Created ${projectName} at ${dest}.

在该目录中，您可以运行以下几个命令:
  * npm start: 启动开发服务器并打开chrome浏览器(支持热替换).
  * npm run build: 打包生产环境的应用到文件夹dist.
  
注意：请先将命令位置移至您的安装根目录:
  cd ${dest}
  npm start

@keyword: react, redux, redux-saga, react-router, ant design
@author:  zhanggl

欢迎使用！
`);
    }
}

function template(dest, cwd) {
    return through.obj(function (file, enc, cb) {
        if (!file.stat.isFile()) {
            return cb();
        }

        info('create', file.path.replace(cwd + '/', ''));
        this.push(file);
        cb();
    });
}

export default init;