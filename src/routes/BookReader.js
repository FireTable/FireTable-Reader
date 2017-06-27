import React from 'react';
import { connect } from 'dva';
import styles from './BookReader.css';
import BookReaderComponent from '../components/BookReader/BookReader';


function BookReader({bookReaderData,dispatch,loading}) {
  bookReaderData = {...bookReaderData,dispatch,loading};
  return (
    <div className={styles.normal}>
      <BookReaderComponent bookReaderData={bookReaderData}/>
    </div>
  );
}

function mapStateToProps(state) {
  const bookReaderData=state.bookReader;
  return {
    bookReaderData:bookReaderData,
    loading: state.loading.models.bookReader,
  };
}

export default connect(mapStateToProps)(BookReader);
