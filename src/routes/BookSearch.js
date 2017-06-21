import React from 'react';
import { connect } from 'dva';
import styles from './BookSearch.css';
import BookSearchComponent from '../components/BookSearch/BookSearch';

function BookSearch({bookSearchData,dispatch,loading}) {
  bookSearchData = {...bookSearchData,dispatch,loading};
  return (
    <div className={styles.normal}>
      <BookSearchComponent bookSearchData={bookSearchData}/>
    </div>
  );
}

function mapStateToProps(state) {
  const bookSearchData=state.bookSearch;
  return {
    bookSearchData:bookSearchData,
    loading: state.loading.models.bookSearch,
  };
}

export default connect(mapStateToProps)(BookSearch);
