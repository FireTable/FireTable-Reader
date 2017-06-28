import React from 'react';
import styles from './BookReader.css';
import {Pagination} from 'antd-mobile';
import {routerRedux} from 'dva/router';
import touch from 'touchjs';
import _ from 'lodash';

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
    this.state.dispatch({
      type: 'bookReader/queryBody',
      payload:{}
   });
  }

  //查询章节
  queryChapter(){
    this.state.dispatch({
      type: 'bookReader/queryChapter',
      payload:{}
   });
  }

  //打开阅读器
  loadData(){
    console.log('loadData');
    this.state.dispatch({
      type: 'bookReader/loadData',
      payload:{}
   });
  }

  //翻页
  pageUp(){
    //scrollHeight该组件总高度,offsetHeight页面一页的高度
    //获取myReader节点,并且存入state
    const myReaderDOM = this.refs.myReader;
    //获取当前位置
    const nowHeight = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
    scrollTo(0, nowHeight + myReaderDOM.offsetHeight);
    this.setState({
      current : this.state.current + 1
    });
  }

  //退页
  pageDown(){
    const myReaderDOM = this.refs.myReader;
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
    this.loadData();
  }


  //第一次加载完
  componentDidMount(){
    //获取myReader节点,并且存入state
    const myReaderDOM = this.refs.myReader;
    //绑定touch事件
    this.touchEvent(myReaderDOM);
  }

  //组件更新,接收props后更新
  componentWillReceiveProps(){
    //页数
    this.getPages();
  }

  //组件重新渲染完毕
  componentDidUpdate(){

  }

  getPages(){
    const myReaderDOM = this.refs.myReader;
    let pages = Math.ceil(parseInt(myReaderDOM.scrollHeight)/parseInt(myReaderDOM.offsetHeight));
    this.setState({
      current : 0,
      pages : pages,
    });
  }

  //转换转义字符
  repalceText(){
    let text = '&nbsp;&nbsp;' + this.props.bookReaderData.text;
    //替换字符串,将/n换成换行,以及添加段落头
    let newText = _.replace(text, new RegExp('\n',"gm"), '<p>&nbsp;&nbsp;');
    return newText;
  }


  render(){
    let title = this.props.bookReaderData.title;
    let newText = this.repalceText();
    console.log(this.props);
    return(
      <div className={styles.normal} ref='myReader'>
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>
        {/* 使用dangerouslySetInnerHTML,显示变量的标签内容 */}
        <div className={styles.text} dangerouslySetInnerHTML={{__html: newText}}></div>
        <Pagination mode="number" total={this.state.pages} current={this.state.current} className={styles.pagination} />
      </div>
    );
  }
}


export default BookReader;
