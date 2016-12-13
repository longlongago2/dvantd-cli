import dva from 'dva';
import undoable, { includeAction, excludeAction } from 'redux-undo';
import createLoading from 'dva-loading'; // 全局创建loading，再也不用写 actionType:showLoading/hideLoading
import './index.html';
import './index.less';

// 1. Initialize
const app = dva({
  onReducer: (reducer) => {
    return (state, action) => {
      const undoOpts = {
        debug: false,        // set to `true` to turn on debugging
        limit: false,        // 设置为一个数字限制历史记录的最大值
        filter: excludeAction([
          'products/playAnimation',
        ]), // history筛选：()=>true 记录所有；includeAction(SOME_ACTION)；excludeAction(SOME_ACTION)
        initTypes: ['@@redux-undo/INIT'], // 设置 @@redux-undo/INIT action 执行的时候重置历史记录
        neverSkipReducer: false,          // prevent undoable from skipping the reducer on undo/redo
      };
      const newState = undoable(reducer, undoOpts)(state, action);
      return { ...newState, routing: newState.present.routing };
    };
  },
});

// 2. Plugins
app.use(createLoading({
  namespace: 'loading', // 键值对数据的键名，默认值：loading
  effects: false
}));

// 3. Model
app.model(require('./models/products'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
