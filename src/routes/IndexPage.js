import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import {Button} from 'antd-mobile';
import MainLayoutComponent from '../components/MainLayout/MainLayout';
import BookShelfComponent from '../components/BookShelf/BookShelf';
import InformationComponent from '../components/Information/Information';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <MainLayoutComponent>
        <BookShelfComponent/>
        <InformationComponent/>
      </MainLayoutComponent>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
