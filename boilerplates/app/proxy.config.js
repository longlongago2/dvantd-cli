const path = require('path');     //nodeJs path模块
const fs = require('fs');         //nodeJs 文件操作(FileSystem)模块

const mock = {};
const fsMockPath = path.join(__dirname, '/mock');  //mock所有文件存放路径
// fs.readdirSync()异步方法将返回一个包含 "指定目录下所有文件名称" 的数组对象
fs.readdirSync(fsMockPath).forEach((file) => {
  Object.assign(mock, require('./mock/' + file)); //将所有的mock数据拷贝合并为一个mock出口
});

module.exports = mock;
