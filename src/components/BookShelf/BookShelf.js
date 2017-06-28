import React from 'react';
import styles from './BookShelf.css';
import {routerRedux} from 'dva/router';
import {SearchBar, Button, WhiteSpace, WingBlank, Grid,NoticeBar,Tag,Modal} from 'antd-mobile';
import _ from 'lodash';

const operation = Modal.operation;

let bookData = null;
//搜索栏关键字
let keyword;

function BookShelf({bookShelfData}) {
  console.log('bookShelfData');
  console.log(bookShelfData);

  const bookList = bookShelfData.bookList;

  //lodash将对象转为数组
  if(bookList != null){
    bookData =  _.toPairs(bookShelfData.bookList);
    bookData.pop();
  }

  //查询关键字相关的书籍
  function queryKeyword(keyword){
    const newData = {keyword:keyword};
    //查询关键字
    bookShelfData.dispatch({
      type: 'bookSearch/queryKeyword',
      payload:newData
   });
   //跳转到搜索页面
   bookShelfData.dispatch(routerRedux.push('/bookSearch'));
  }

  //查询书架的书
  function queryShelf(){
    bookShelfData.dispatch({
      type: 'bookShelf/query',
      payload:{}
   });
  }

  //删除书架的书
  function deleteBook(id){
    const newData = {id:id};
    bookShelfData.dispatch({
      type: 'bookShelf/_delete',
      payload:newData
   });
  }

  //看书
  function readBook(data){
    const newData = data;
    console.log('readBook');
    console.log(newData);
    //先保存书的信息
    bookShelfData.dispatch({
      type: 'bookShelf/saveBook',
      payload:newData
   });
   //跳转到看书页面
   bookShelfData.dispatch(routerRedux.push('/bookReader'));
  }

  //决定显示内容
  const ContentComponent = ()=>{
    if(bookList != null){
      return(
        <div>
          <Grid data={bookData}
            columnNum={3}
            hasLine={false}
            renderItem={(dataItem, index) => (
              <div style={{ margin: '0.2rem', textAlign: 'center' }}>
                <img src={dataItem[1].book_icon} style={{ width: '1.4rem',height:'1.8rem',border:'1px solid #ddd'}}  />
                <div>
                  <span style={{ margin: '0.1rem',fontSize:'0.25rem'}}>{dataItem[1].book_name}</span>
                </div>
              </div>
            )}
            onClick={(el,index)=>{
              console.log(el);
              const data = el[1];
              const id = data.id;
              operation([
                  { text: '开始阅读', onPress: () => readBook(data)},
                  { text: '不追了', onPress: () => deleteBook(id),style:{color:'#F66666'}},
                  { text: '取消', onPress:() => console.log('取消') },
                ]);

              }
            }
          />
        </div>
      );
    }else{
      return(
        <div style={{color:'#F66666'}}>
            书架空空的!<br/>
            快去添点书吧!
        </div>
      );
    }
  }

  return (
    <div className={styles.normal}>
      <Button onClick={()=>queryShelf()}>abc</Button>
      <SearchBar placeholder="搜索"
        onSubmit={(value) => queryKeyword(value)}
      />
      <NoticeBar  icon={null}  marqueeProps={{ loop: true, style: { padding: '0 0.15rem' } }}>
        _(:з」∠)_感谢您的支持，本应用只作学习交流、个人研究之用。请勿用于商业及非法用途，如由此引起的相关法律法规责任，与本人无关！
      </NoticeBar>
      <WhiteSpace />
      <ContentComponent/>
    </div>
  );
}

export default BookShelf;
