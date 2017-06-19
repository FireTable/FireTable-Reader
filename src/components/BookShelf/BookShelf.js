import React from 'react';
import styles from './BookShelf.css';
import {SearchBar, Button, WhiteSpace, WingBlank, Grid,NoticeBar,Tag} from 'antd-mobile';

const data = Array.from(new Array(9)).map((_val, i) => ({icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png', text: `name${i}`}));

function BookShelf() {
  return (
    <div className={styles.normal}>
      <SearchBar placeholder="搜索"/>
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
