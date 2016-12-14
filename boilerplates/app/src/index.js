import dva from 'dva';
import createLoading from 'dva-loading';
import undoable, { includeAction, excludeAction } from 'redux-undo';
import './index.html';
import './index.less';

// 1. Initialize
const app = dva({
  onReducer: (reducer) => {
    return (state, action) => {
      const undoOpts = {
        debug: false,
        limit: false,
        filter: () => true, // ()=>true; includeAction(SOME_ACTION); excludeAction(SOME_ACTION)
        initTypes: ['@@redux-undo/INIT'], // 设置 @@redux-undo/INIT action 执行的时候重置history
        neverSkipReducer: false,          // prevent undoable from skipping the reducer on undo/redo
      };
      const newState = undoable(reducer, undoOpts)(state, action);
      return { ...newState, routing: newState.present.routing };
    };
  }
});

// 2. Plugins
app.use(createLoading({
  namespace: 'loading',
  effect: false
}));

// 3. Model
app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
