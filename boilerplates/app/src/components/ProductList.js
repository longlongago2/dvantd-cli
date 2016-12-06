/**
 * todo: 函数式无状态组件(Stateless Functional Component) 详情见笔记
 */
import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Form, Switch } from 'antd';

const FormItem = Form.Item;
const ProductList = ({
  onDelete, onToggle, onInsertItem, onEditItem, dataSource, loading, bordered
}) => {
  const tableHeader = () => {
    return (
      <h2 style={{ textAlign: 'center' }}> List of Products </h2>
    );
  };
  const tableFooter = (listLength) => {
    return (
      <b>共{listLength}条数据</b>
    );
  };
  const tableRowSelection = {
    onChange(selectedRowKeys, selectedRows) {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect(record, selected, selectedRows) {
      console.log(record, selected, selectedRows);
    },
    onSelectAll(selected, selectedRows, changeRows) {
      console.log(selected, selectedRows, changeRows);
    },
  };
  const tableColumns = [
    {
      title: 'No.',
      width: 50,
      render: (text, record, index) => {
        return index + 1;
      }
    },
    {
      title: 'ID',
      dataIndex: 'id',
      width: 150
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Actions',
      width: 200,
      render(text, record) {
        return (
          <div>
            <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
              <Button>删除</Button>
            </Popconfirm>
            <span> | </span>
            <Button onClick={() => onEditItem(record)}>编辑</Button>
          </div>
        );
      },
    },
  ];
  // footer、title属性：不显示设置为 undefined 即可；rowKey 代替数据源中没有key，这里直接绑定唯一标识
  const productListTableProps = {
    rowKey: record => record.id,
    dataSource,
    loading,
    bordered,
    columns: tableColumns,
    rowSelection: tableRowSelection,
    title: tableHeader,
    footer: dataSource.length > 0 ? tableFooter.bind(this, dataSource.length) : undefined
  };
  const borderSwitchProps = {
    checked: bordered,
    checkedChildren: 'ON',
    unCheckedChildren: 'OFF',
    onChange: onToggle.bind(this, 'bordered'),
  };
  return (
    <div>
      <Form inline>
        <FormItem label="Border">
          <Switch {...borderSwitchProps}/>
        </FormItem>
        <FormItem label="Insert">
          <Button type="primary" size="small" onClick={onInsertItem}>新增</Button>
        </FormItem>
      </Form>
      <Table {...productListTableProps}/>
    </div>
  );
};

ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onInsertItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  dataSource: PropTypes.array.isRequired,
  loading: PropTypes.any.isRequired,
  bordered: PropTypes.any.isRequired
};

export default ProductList;
