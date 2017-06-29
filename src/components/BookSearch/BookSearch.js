import React from 'react';
import styles from './BookSearch.css';
import {Card,Button,List,WhiteSpace,SwipeAction,NoticeBar} from 'antd-mobile';
import { routerRedux} from 'dva/router';

const Item = List.Item;
const Brief = Item.Brief;
let books = null;
let ItemList = '';
let details = null;

function BookSearch({bookSearchData}) {
  console.log('bookSearchData');
  console.log(bookSearchData);

  //获取model中的数据
  details = bookSearchData.details;

  //查询书籍id
  function queryId(id){
    const newData = {id:id};
    //查询关键字
    bookSearchData.dispatch({
      type: 'bookSearch/queryId',
      payload:newData
   });
  }

  //返回主页
  function backIndexPage(){
    //跳转到主页面
    bookSearchData.dispatch(routerRedux.push('/'));
  }

  //添加书本到书架
   function addBook(){
     //通过计时器来获取书本信息
    const timer=setInterval(function(){
      console.log('Timer working');
      console.log(details);
      if(details != null ){
        const bookData = details;
        bookData.cover = bookData.cover.replace("/agent/","");
        const newData = {
          book_id:bookData._id,
          book_icon:bookData.cover,
          book_name:bookData.title
        };
        //添加书本到书架
        bookSearchData.dispatch({
          type: 'bookShelf/create',
          payload:newData
       });
       //清除计时器
       clearInterval(timer);

     }else{
       console.log('No details');
     }
   },200);
  }

  if(bookSearchData.books != null){
    books = bookSearchData.books;
    //列表
    ItemList = books.map(book =>{
      book.cover = book.cover.replace("/agent/","");
      return(
          <div>
          <SwipeAction
              style={{ backgroundColor: 'gray' }}
              autoClose
              right={[
                {
                  text: '取消',
                  onPress: () => console.log('取消'),
                  style: { backgroundColor: '#ddd', color: 'white' },
                },
                {
                  text: '追书',
                  onPress: () => {
                    queryId(`${book._id}`);
                    addBook();
                  },
                  style: { backgroundColor: '#F66666', color: 'white' },
                },
              ]}
              onOpen={() => console.log('global open')}
              onClose={() => console.log('global close')}
          >
          <Item
              thumb={book.cover}
              arrow="horizontal"
              key={book._id}
              wrap
              onClick={ () =>
              console.log('onClick')
            }
              >
                <span style={{fontSize:'0.34rem'}}>
                {book.title}
                </span>
                <span style={{fontSize:'0.26rem',color:'#666666'}}>
                  &nbsp;#
                </span>
                <span style={{fontSize:'0.26rem',color:'#F66666'}}>
                {book.cat}
                </span>
                <span style={{fontSize:'0.26rem',color:'#99aa66'}}>
                ·{book.hasCp == true? '已完本':'连载中'}
                </span>
               <div style={{fontSize:'0.26rem',color:'#666666',marginTop:'0.01rem'}}>
                    作者:{book.author} &nbsp;&nbsp;&nbsp;字数:{(book.wordCount/10000).toFixed(1)}w
                    <br/>
               </div>
               <div style={{fontSize:'0.26rem',color:'#666666',marginTop:'0.01rem'}}>
                    {book.shortIntro}
               </div>
          </Item>
        </SwipeAction>
        </div>
      );
    }
   );
  }

  return (
    <div className={styles.normal}>
      <div>
      <List renderHeader='- 搜索结果 -'
       id='list1' key='1'>
       <NoticeBar icon={null}>往左滑动可以追书，点击右下角按钮可以返回主页。</NoticeBar>
        {ItemList}
      </List>
      </div>
      <div className={styles.div_btn}>
      <Button  type="primary" inline style={{ margin: '0.08rem' }}
               onClick={ () => backIndexPage()}
               >&lt;</Button>
      </div>
    </div>
  );
}

export default BookSearch;
