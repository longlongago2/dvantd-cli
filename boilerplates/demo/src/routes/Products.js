import React, { PropTypes } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import { ActionCreators } from 'redux-undo';
import ProductList from '../components/ProductList';
import UserModal from '../components/UserModal';
import styles from './Products.less';

const Products = ({ location, dispatch, products, dva_loading }) => {
  const {
    modalType, modalVisible, currentItem, list, bordered
  } = products; // products中state的属性

  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id, //这种写法等价于{id:id}
    });
  }

  function handleToggle(stateName, checked) {
    dispatch({
      type: 'products/toggle',
      payload: { [stateName]: checked }
    });
  }

  function handleEditItem(item) {
    dispatch({
      type: 'products/playAnimation',
      payload: {
        currentItem: item,
        modalVisible: true,
        modalType: 'update'
      }
    });
  }

  function handleInsertItem() {
    dispatch({
      type: 'products/playAnimation',
      payload: {
        modalVisible: true,
        modalType: 'insert'
      }
    });
  }

  function handleOk(paramObj) {
    dispatch({
      type: 'products/playAnimation',
      payload: { modalVisible: false }
    });
    dispatch({
      type: `products/${modalType}`,
      payload: paramObj
    });
  }

  function handleCancel() {
    dispatch({
      type: 'products/playAnimation',
      payload: { modalVisible: false }
    });
  }

  function handleUndo() {
    dispatch(
      ActionCreators.undo()
    );
  }

  function handleReload() {
    dispatch({
      type: 'products/reload'
    });
  }

  const productsListProps = {
    onDelete: handleDelete,
    onToggle: handleToggle,
    onEditItem: handleEditItem,
    onInsertItem: handleInsertItem,
    onUndo: handleUndo,
    onReload: handleReload,
    dataSource: list,
    loading: dva_loading.models.products,
    bordered,
  };

  const userModalProps = {
    item: modalType === 'insert' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk: handleOk,
    onCancel: handleCancel
  };

  // 【重要】解决 Form.create initialValue 的问题
  // 每次创建一个全新的组件, 而不做diff
  // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html
  const UserModalGen = () =>
    <UserModal {...userModalProps} />;

  return (
    <div>
      <p className={styles.fontTitle}> dva简单样例 </p>
      <Row type="flex" justify="center" align="middle">
        <Col span={16}>
          <ProductList {...productsListProps} />
          <UserModalGen />
        </Col>
      </Row>
    </div>
  );
};

Products.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  products: PropTypes.object,
  dva_loading: PropTypes.object
};

/** todo: connect 用法
 * 一、redux 中 connect 的用法
 * 作用：Products 通过 connect 从单纯的UI组件，连接业务逻辑（输入逻辑和输出逻辑），生成容器组件。
 * 1.1、输入逻辑：外部的数据（即state对象）如何传入 UI 组件的参数（即props属性）
 * 1.2、输出逻辑：用户发出的动作如何变为 Action 对象，从 UI 组件传出去。
 */
function mapStateToProps(state) {
  // 将 products 和 loading 数据作为属性传入
  return { products: state.present.products, dva_loading: state.present.loading };
}
export default connect(mapStateToProps)(Products); // connect 将单纯的UI组件传入外部的products数据
