import React from 'react';
import styles from './BookShelf.css';
import { routerRedux} from 'dva/router';
import {SearchBar, Button, WhiteSpace, WingBlank, Grid,NoticeBar,Tag} from 'antd-mobile';

const data = Array.from(new Array(5)).map((_val, i) => ({icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png', text: `name${i}`}));

//搜索栏关键字
let keyword;

function BookShelf({bookShelfData}) {
  console.log('bookShelfData');
  console.log(bookShelfData);

  //查询关键字相关的书籍
  function queryKeyword(keyword){
    const newData = {keyword:keyword};
    //查询关键字
    bookShelfData.dispatch({
      type: 'bookSearch/queryKeyword',
      payload:newData
   });
   //跳转到搜索页面
   bookShelfData.dispatch(routerRedux.push('/BookSearch'));
  }

  return (
    <div className={styles.normal}>
      <SearchBar placeholder="搜索"
        onSubmit={(value) => queryKeyword(value)}
      />
      <NoticeBar  icon={null}  marqueeProps={{ loop: true, style: { padding: '0 0.15rem' } }}>
        _(:з」∠)_感谢您的支持，本应用只作学习交流、个人研究之用。请勿用于商业及非法用途，如由此引起的相关法律法规责任，与本人无关！
      </NoticeBar>
      <WhiteSpace />
      <div>
        <Grid data={data} columnNum={3} hasLine={false}/>
      </div>
    </div>
  );
}

export default BookShelf;
