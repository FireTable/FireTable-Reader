import React from 'react';
import styles from './BookReader.css';
import {Pagination} from 'antd-mobile';
import { routerRedux} from 'dva/router';
import touch from 'touchjs';

class BookReader extends React.Component{
  //构造器
  constructor(props) {
    super(props);
    console.log(props);
    const bookReaderData = props.bookReaderData;
    this.state = {
      fontSize:bookReaderData.fontSize,
      background:bookReaderData.background,
      dispatch:bookReaderData.dispatch,
    };
    console.log(this.state);
  }

  //查询正文
  queryBody(){
    const newData ={id : '21'};
    this.state.dispatch({
      type: 'bookReader/queryBody',
      payload:newData
   });
  }

  //翻页
  pageUp(){
    //scrollHeight该组件总高度,offsetHeight页面一页的高度
    //获取myReader节点,并且存入state
    const myReaderDOM = this.state.myReaderDOM;
    //获取当前位置
    const nowHeight = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
    scrollTo(0, nowHeight + myReaderDOM.offsetHeight);
    this.setState({
      current : this.state.current + 1
    });
  }

  //退页
  pageDown(){
    const myReaderDOM = this.state.myReaderDOM;
    const nowHeight = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
    scrollTo(0, nowHeight - myReaderDOM.offsetHeight);
    this.setState({
      current : this.state.current - 1
    });
  }

  //手势事件
  touchEvent(myReaderDOM){
    //按住
    touch.on(myReaderDOM,'hold',()=>this.pageDown());
    //滑动
    touch.on(myReaderDOM,'swipestart',()=>console.log('swipestart'));
    touch.on(myReaderDOM,'swipeend',(ev)=>{
      console.log(ev.direction);
      switch (ev.direction) {
        case 'left' :
          this.pageDown();
          break;
        case 'right' :
          this.pageUp();
          break;
      }
    });
  }

  //加载前读取数据
  componentWillMount(){
    this.queryBody();
  }


  //第一次加载完
  componentDidMount(){
    //获取myReader节点,并且存入state
    const myReaderDOM = this.refs.myReader;
    //获取占页数
    const pages = Math.ceil(parseInt(myReaderDOM.scrollHeight)/ parseInt(myReaderDOM.offsetHeight));
    this.setState({
      myReaderDOM : myReaderDOM,
      pages : pages,
      current : 0
    });
    //绑定touch事件
    this.touchEvent(myReaderDOM);
  }

  //组件更新
  componentWillUpdate(){
    const bookReaderData = this.props.bookReaderData;
    console.log('willUpdate');
    console.log(this.state);
    console.log(this.props);

  }


  render(){
    return(
      <div className={styles.normal} ref='myReader' >
        Component: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: Component:Component: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: Component:
        BookReaderComponent: Component:Component: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: Component:
        BookReaderComponent: Component:Component: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: Component:
        BookReaderComponent: Component:
        BookReaderComponent: Component:BookReaderComponent: Component:BookReaderComponent: Component:BookReaderComponent: Component:BookReaderComponent: Component:BookReaderComponent: Component:BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderBookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReaderComponent: BookReader
        <Pagination mode="number" total={this.state.pages} current={this.state.current} className={styles.pagination} />
      </div>
    );
  }
}


export default BookReader;
