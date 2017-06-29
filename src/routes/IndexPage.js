import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import {Button} from 'antd-mobile';
import MainLayoutComponent from '../components/MainLayout/MainLayout';
import BookShelfComponent from '../components/BookShelf/BookShelf';
import InformationComponent from '../components/Information/Information';

function IndexPage({userData,bookShelfData,dispatch}) {
  bookShelfData = {...bookShelfData,dispatch};
  userData = {...userData,dispatch};
  const layoutData = {dispatch:dispatch};
  return (
    <div className={styles.normal}>
      <MainLayoutComponent layoutData={layoutData}>
        <BookShelfComponent bookShelfData={bookShelfData}/>
        <InformationComponent userData={userData}/>
      </MainLayoutComponent>
    </div>
  );
}

IndexPage.propTypes = {
};

function mapStateToProps(state) {
  const userData = state.user;
  const bookShelfData=state.bookShelf;
  return {
    userData:userData,
    bookShelfData:bookShelfData,

  };
}

export default connect(mapStateToProps)(IndexPage);
