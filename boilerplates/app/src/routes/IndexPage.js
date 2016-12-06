import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.less';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1>My dva!</h1>
      <hr />
      <ul className={styles.list}>
        <li>dva框架主要集成 <code> react react-redux react-router react-dom </code> antd </li>
        <li><Link to="/products">跳转./products</Link></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
