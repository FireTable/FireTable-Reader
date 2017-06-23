import React from 'react';
import styles from './BookSearch.css';
import {Card,Button,List,WhiteSpace,SwipeAction,NoticeBar} from 'antd-mobile';
import { routerRedux} from 'dva/router';

const Item = List.Item;
const Brief = Item.Brief;
let books;
let ItemList = '';

function BookSearch({bookSearchData}) {
  console.log('bookSearchData');
  console.log(bookSearchData);

  //获取model中的数据
  const data = bookSearchData.data;

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

  if(data != null){
    books = data.books;
    //列表
    ItemList = books.map(book =>{
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
                  onPress: () => console.log('追书'),
                  style: { backgroundColor: '#F66666', color: 'white' },
                },
              ]}
              onOpen={() => queryId(`${book._id}`)}
              onClose={() => console.log('global close')}
          >
          <Item
              thumb={book.cover}
              arrow="horizontal"
              key={book._id}
              wrap
              onClick={ () => {
                queryId(`${book._id}`);
              }
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
