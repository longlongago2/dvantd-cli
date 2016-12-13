/**
 * effects
 * todo: es6 Generator Function 详情见笔记
 * 特征：function* Func(){ yield... }
 * todo: redux-saga 简介 详情见笔记
 * 介绍：redux-saga 是基于Generator Function的解决 action异步 的一个中间件
 * 作用：这里的effects的参数 select call put 都来自redux-saga中间件
 */
import { message } from 'antd';
import { parse, stringify } from 'qs';
import { query, remove, update, insert, toggleUpdate } from '../services/products';

export default {
  // model 领域名称
  namespace: 'products',
  // state 规划
  state: {
    bordered: false,     // 表格是否显示线框
    modalVisible: false, // 模态框状态
    modalType: 'insert', // 模态框类型（标题）
    list: [],            // 表格数据
    currentItem: {},     // 当前行数据，编辑
  },
  // 订阅数据源（初始数据）
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/products') { // 请求首屏数据
          dispatch({
            type: 'query',
            payload: location.query,
          });
        }
      });
    },
  },
  // effects:异步action与后端交互逻辑（更改数据库数据）
  effects: {
    // state：redux-saga select 获取的是 redux 的 State（redux浏览器插件中查看），而非 products model 定义的 state，可以解构使用
    // actionType : products/reload
    * reload({ payload }, { call, put }) {
      const { data } = yield call(query, parse(payload));
      if (data && data.success) {
        yield put({
          type: 'reloadSuccess',
          payload: {
            bordered: data.bordered,
            list: data.data,
          }
        });
      } else {
        message.error('重新载入失败，请您稍后再试！');
        yield put({ type: '@@redux-undo/UNDO' });
      }
    },
    // actionType : products/toggle
    * toggle({ payload }, { call, put }) {
      yield put({
        type: 'playAnimation',
        payload
      });
      const { data } = yield call(toggleUpdate, parse(payload));
      if (data && data.success) {
        yield put({ type: 'toggleSuccess' });
      } else {
        message.error('切换操作失败，请您稍后再试！');
        yield put({ type: '@@redux-undo/UNDO' });
      }
    },
    // actionType : products/insert
    * insert({ payload }, { call, put }) {
      const { data } = yield call(insert, parse(payload));
      if (data && data.success) {
        // 新增完成，刷新数据
        const { data } = yield call(query, parse(payload));
        if (data && data.success) {
          yield put({
            type: 'insertSuccess',
            payload: {
              bordered: data.bordered,
              list: data.data,
            }
          });
        } else {
          message.error('重新载入失败，请您稍后再试！');
          yield put({ type: '@@redux-undo/UNDO' });
        }
      } else {
        message.error('插入操作失败，请您稍后再试！');
        yield put({ type: '@@redux-undo/UNDO' });
      }
    },
    // actionType : products/update
    * update({ payload }, { select, call, put }) {
      const id = yield select(({ present }) => present.products.currentItem.id); // 取redux中的state
      const newData = { ...payload, id };
      const { data } = yield call(update, parse(newData));
      if (data && data.success) {
        yield put({
          type: 'updateSuccess',
          payload: newData,
        });
      } else {
        message.error('更新操作失败，请您稍后再试！');
        yield put({ type: '@@redux-undo/UNDO' });
      }
    },
    // actionType : products/query
    * query({ payload }, { call, put }) {
      const { data } = yield call(query, parse(payload));
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            bordered: data.bordered,
            list: data.data,
          }
        });
      } else {
        message.error('查询操作失败，请您稍后再试！');
        yield put({ type: '@@redux-undo/UNDO' });
      }
    },
    // actionType : products/delete  加引号因为delete是关键字
    * 'delete'({ payload }, { call, put }) {
      const { data } = yield call(remove, { id: payload });  // 1、先调用接口更改数据库数据
      if (data && data.success) {                            // 2、如果成功就进行下一步，更新state
        yield put({                                          // 3、执行reducers中的deleteSuccess
          type: 'deleteSuccess',
          payload,
        });
      } else {
        message.error('删除操作失败，请您稍后再试！');
        yield put({ type: '@@redux-undo/UNDO' });            // 4、执行失败，还原上一状态
      }
    },
  },
  // reducer:计算state（更改本地缓存数据）
  reducers: {
    // state：这里的 state 是 model 直接定义的 state，可以解构使用
    // actionType : products/playAnimation 更新动画状态
    playAnimation(state, action) {
      return { ...state, ...action.payload };
    },
    // actionType : products/querySuccess
    querySuccess(state, action) {
      // 将已改变的部分state和原来的state(未改变的部分state)组合成一个新的state
      return { ...state, ...action.payload };
    },
    // actionType : products/deleteSuccess
    deleteSuccess(state, action) { //action：传入的payload里面包含需要的参数id
      const deleteId = action.payload;
      const newList = state.list.filter(item => item.id !== deleteId);
      return { ...state, list: newList };
    },
    // actionType : products/updateSuccess
    updateSuccess(state, { payload }) {
      const updateItem = payload;
      const newList = state.list.map((item) => {
        if (item.id.toString().trim() === updateItem.id.toString().trim()) {
          return updateItem;
        }
        return item;
      });
      return { ...state, list: newList };
    },
    // actionType : products/insertSuccess
    insertSuccess(state, { payload }) {
      return { ...state, ...payload };
    },
    // actionType : products/reloadSuccess
    reloadSuccess(state, { payload }) {
      return { ...state, ...payload };
    },
    // actionType : products/toggleSuccess
    toggleSuccess(state) {
      return state;
    }
  }
};
