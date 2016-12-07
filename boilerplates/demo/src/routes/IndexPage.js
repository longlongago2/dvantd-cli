import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.less';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <div className={styles.title}>
        <div className={styles.logo}>
          <img src={require("../static/logo.png")}/>
        </div>
        <div className={styles.word}>
          My dva + Ant Design !
        </div>
      </div>
      <hr />
      <ul className={styles.list}>
        <li>dva框架主要集成 <b> react / react-redux / react-router / react-saga / ant-design </b></li>
        <li><Link to="/products">跳转./products</Link></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
