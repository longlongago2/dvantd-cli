import which from 'which'; // 查找路径中可执行文件的第一个实例

function runCmd(cmd, args, fn) {
    args = args || [];
    const runner = require('child_process').spawn(cmd, args, {
        // keep color
        stdio: "inherit"
    });
    runner.on('close', function (code) {
        if (fn) {
            fn(code);
        }
    });
}
/**
 * tnpm cnpm npm 顺序检查命令是否可用，如果遇到可执行的命令就中断返回。如果3个命令都不可用就报错
 * @returns {string}
 */
function findNpm() {
    const npms = ['tnpm', 'cnpm', 'npm'];
    for (let i = 0; i < npms.length; i++) {
        try {
            which.sync(npms[i]); // throws if not found
            console.log('use npm: ' + npms[i]);
            return npms[i];
        } catch (err) {
        }
    }
    throw new Error('please install npm');
}

export default function (done) {
    const npm = findNpm();
    runCmd(which.sync(npm), ['install'], function () {
        runCmd(which.sync(npm), ['install', 'dva', '--save'], function () {
            console.log(npm + ' install end');
            done();
        });
    });
};