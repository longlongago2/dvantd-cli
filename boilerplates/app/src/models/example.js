/**
 * model标准格式
 */
export default {
  // 1.model领域名称
  namespace: 'example',
  // 2.状态map
  state: {},
  // 3.订阅数据源（一般订阅默认加载的数据，例如初始数据）
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },
  // 4.异步数据逻辑（通过接口更新数据源）
  effects: {
    * fetchRemote({ payload }, { call, put }) {
    },
  },
  // 处理页面数据逻辑（通过更新state来驱动页面改变）
  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
