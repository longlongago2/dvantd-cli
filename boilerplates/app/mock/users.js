/**
 * mock数据
 * 回调函数参数说明：req:request(请求) res:response(响应)
 * @author zhanggl
 */

'use strict';

const qs = require('qs');
const Mock = require('mockjs');

// 数据持久
let mockData = {};
if (!global.tableListData) { // 首次加载
  const data = Mock.mock({
    'data|10': [{
      id: '@float(100,999,13,13)',
      name: '@cname',
      price: '@natural(50,1000)',
    }],
    bordered: '@boolean'
  });
  mockData = data;
  global.tableListData = mockData;
} else {
  mockData = global.tableListData;
}

module.exports = {
  // 查询
  'GET /api/products': function (req, res) {
    setTimeout(() => {
      res.json({
        success: true,
        bordered: mockData.bordered,
        data: mockData.data,
      });
    }, 500);
  },
  // 删除
  'DELETE /api/products': function (req, res) {
    const status = true;
    setTimeout(() => {
      if (status) {
        const deleteItem = qs.parse(req.body);
        mockData.data = mockData.data.filter((item) => {
          return item.id.toString().trim() !== deleteItem.id.toString().trim();
        });
        global.tableListData = mockData;
      }
      res.json({
        success: status,
        // bordered: mockData.bordered,
        // data: mockData,
      });
    }, 500);
  },
  // 创建
  'POST /api/products': function (req, res) {
    const status = true; // 模拟状态
    setTimeout(() => {
      if (status) {
        const addData = qs.parse(req.body); // 接收的新数据
        addData.id = Math.random() * 1000;
        mockData.data.push(addData); // 数组尾部添加新数据,头部添加：unshift
        global.tableListData = mockData;
      }
      res.json({
        success: status,
        // bordered: mockData.bordered,
        // data: mockData.data, // 约定：创建、更新只返回数据库操作成功标志，然后执行query动作，不返回新数据
      });
    }, 500);
  },
  // 更新
  'PUT /api/products': function (req, res) {
    const status = true;
    setTimeout(() => {
      if (status) {
        const updateItem = qs.parse(req.body);
        mockData.data = mockData.data.map((item) => {
          if (item.id.toString().trim() === updateItem.id.toString().trim()) {
            return updateItem;
          }
          return item;
        });
        global.tableListData = mockData;
      }
      res.json({
        success: status,
        // bordered: mockData.bordered,
        // data: mockData.data,
      });
    }, 500);
  },
  // 按钮切换
  'PUT /api/toggle': function (req, res) {
    const status = true;
    setTimeout(() => {
      if (status) {
        mockData.bordered = !mockData.bordered;
        global.tableListData = mockData;
      }
      res.json({
        success: status,
      });
    }, 500);
  }
};
