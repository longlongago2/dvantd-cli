/**
 * effects
 * todo: es6 Generator Function 详情见笔记
 * 特征：function* Func(){ yield... }
 * todo: redux-saga 简介 详情见笔记
 * 介绍：redux-saga 是基于Generator Function的解决 action异步 的一个中间件
 * 作用：这里的effects的参数 select call put 都来自redux-saga中间件
 */
import dva from 'dva';
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
    loading: false,      // loading动画
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
    // action : products/reload
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
        yield put({ type: 'hideLoading' });
      } else {
        yield put({ type: 'operationFailed' });
      }
    },
    // action : products/toggle
    * toggle({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      yield put({
        type: 'playAnimation',
        payload
      });
      const { data } = yield call(toggleUpdate, parse(payload));
      if (data && data.success) {
        yield put({ type: 'hideLoading' });
      } else {
        yield put({ type: 'operationFailed' }); // 数据处理失败，要还原状态
      }
    },
    // action : products/insert
    * insert({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(insert, parse(payload));
      if (data && data.success) {
        // 新增完成，刷新数据
        yield put({ type: 'reload' });
      } else {
        yield put({ type: 'operationFailed' });
      }
    },
    // action : products/update
    * update({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const id = yield select(({ products }) => products.currentItem.id);
      const newData = { ...payload, id };
      const { data } = yield call(update, parse(newData));
      if (data && data.success) {
        yield put({
          type: 'updateSuccess',
          payload: newData,
        });
        yield put({ type: 'hideLoading' });
      } else {
        yield put({ type: 'operationFailed' }); // 数据处理失败，要还原状态
      }
    },
    // action : products/query
    * query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(query, parse(payload));
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            bordered: data.bordered,
            list: data.data,
          }
        });
        yield put({ type: 'hideLoading' });
      } else {
        yield put({ type: 'operationFailed' });
      }
    },
    // action : products/delete  加引号因为delete是关键字
    * 'delete'({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });                    // 0、显示loading画面
      const { data } = yield call(remove, { id: payload });  // 1、先调用接口更改数据库数据
      if (data && data.success) {                            // 2、如果成功就进行下一步，更新state
        yield put({                                          // 3、执行reducers中的deleteSuccess
          type: 'deleteSuccess',
          payload,
        });
        yield put({ type: 'hideLoading' });
      } else {
        yield put({ type: 'operationFailed' });
      }
    },
  },
  // reducer:计算state（更改本地缓存数据）
  reducers: {
    // action : products/showLoading
    showLoading(state) {
      global.prevState = state; // 记录变化前的state,方便失败时回滚
      return { ...state, loading: true };
    },
    // action : products/hideLoading
    hideLoading(state) {
      return { ...state, loading: false };
    },
    // action : products/playAnimation 先更新动画状态
    playAnimation(state, action) {
      return { ...state, ...action.payload };
    },
    // action : products/querySuccess
    querySuccess(state, action) {
      // state：上一个state, action：传入已改变的部分state
      // 将已改变的部分state和原来的state(未改变的部分state)组合成一个新的state
      return { ...state, ...action.payload };
    },
    // action : products/deleteSuccess
    deleteSuccess(state, action) { //action：传入的payload里面包含需要的参数id
      const deleteId = action.payload;
      const newList = state.list.filter(item => item.id !== deleteId);
      return { ...state, list: newList };
    },
    // action : products/updateSuccess
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
    // action : products/reloadSuccess
    reloadSuccess(state, { payload }) {
      return { ...state, ...payload };
    },
    // action : products/operationFailed 操作失败后还原上一个状态
    operationFailed() {
      message.error('抱歉，您本次操作失败，请稍候重试！');
      return { ...global.prevState, loading: false };
    },
  }
};
