import React, { PropTypes } from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const UserModal = ({
  onOk, onCancel, visible, type, item = {}, form: {
  getFieldDecorator,
  validateFields,
  getFieldsValue,
}
}) => {
  /**
   * 通过runOk方法中转，传入参数到onOk
   */
  function runOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = { ...getFieldsValue() }; // 新增对象数据
      onOk(data);
    });
  }

  /**
   * 文本框验证规则
   * @param rule
   * @param value
   * @param callback
   */
  function checkNumber(rule, value, callback) {
    if (!value) {
      callback(new Error('产品价格未填写！'));
    }
    if (!/^[\d]{1,10}$/.test(value)) {
      callback(new Error('价格填写不合法：（只能填不超过10位的数字）'));
    } else {
      callback();
    }
  }

  const modalProps = {
    title: type === 'insert' ? '创建' : '编辑',
    visible,
    onOk: runOk,
    onCancel,
  };

  return (
    <Modal {...modalProps}>
      <Form horizontal>
        <FormItem
          label="名称："
          hasFeedback
          {...formItemLayout}
        >
          {
            getFieldDecorator('name', { // 函数自执行func()():定义自动获取表单值的名称和值
              initialValue: item.name,  // 初始数据
              rules: [
                { required: true, message: '产品名称未填写！' },
              ],
            })(<Input type="text"/>)
          }
        </FormItem>
        <FormItem
          label="价格："
          hasFeedback
          {...formItemLayout}
        >
          {
            getFieldDecorator('price', {
              initialValue: item.price, // 初始数据
              rules: [
                { required: true, validator: checkNumber },
              ],
            })(<Input type="text"/>)
          }
        </FormItem>
      </Form>
    </Modal>
  );
};

UserModal.propTypes = {
  form: PropTypes.object,
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Form.create()(UserModal);
