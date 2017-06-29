import React from 'react';
import styles from './BookReader.css';
import {Pagination,Popup,List,Button,WhiteSpace,WingBlank,Toast} from 'antd-mobile';
import {routerRedux} from 'dva/router';
import touch from 'touchjs';
import _ from 'lodash';

const config = require('../../config.json');
const touchjs_config = config.config.touchjs;
const Item = List.Item;



//popup的设置
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let maskProps;
if (isIPhone) {
  // Note: the popup content will not scroll.
  maskProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

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

  //上一章
  prePage(){
    window.scrollTo(0,0);
    console.log('prePage');
    this.state.dispatch({
      type: 'bookReader/prePage',
      payload:{}
   });
  }

  //下一章
  nextPage(){
    window.scrollTo(0,0);
    console.log('nextPage');
    this.state.dispatch({
      type: 'bookReader/nextPage',
      payload:{}
   });
  }

  //手势事件
  touchEvent(myReaderDOM){
    //按住
    touch.on(myReaderDOM,'hold',()=>this.openFunctionBar());
    //滑动
    touch.on(myReaderDOM,'swipestart',()=>console.log('swipestart'));
    touch.on(myReaderDOM,'swipeend',(ev)=>{
      console.log(ev.direction);
      switch (ev.direction) {
        case 'left' :
          this.prePage();
          break;
        case 'right' :
          this.nextPage();
          break;
        default :
          break;
      }
    });
  }

  //获取页码
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
    let newText = _.replace(text, new RegExp('\n',"gm"), '<br/>&nbsp;&nbsp;');
    return newText;
  }

  //浏览器滚动事件
  handleScroll() {
    let myReaderDOM = this.refs.myReader;
    //获取当前位置
    const nowHeight = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
    const current = Math.ceil(parseInt(nowHeight)/parseInt(myReaderDOM.offsetHeight));
    //如果计数改变了,就改变
    if(current != this.state.current){
      this.setState({
        current : current
      });
    }
  }

  //加载前读取数据
  componentWillMount(){
    this.loadData();
  }


  //第一次加载完
  componentDidMount(){
    //获取myReader节点,并且存入state
    let myReaderDOM = this.refs.myReader;
    //绑定touch事件
    this.touchEvent(myReaderDOM);
    //监听滚动事件
    window.addEventListener('scroll',()=>this.handleScroll());
  }

  //组件更新,接收props后更新
  componentWillReceiveProps(){
    //页数
    this.getPages();
  }

  //组件重新渲染完毕
  componentDidUpdate(){

  }

  //打开功能栏
  openFunctionBar(){
    Popup.show(
      <div>
      <List renderHeader={() => (
        <div style={{ position: 'relative' }}>
          更改样式
          <span style={{position: 'absolute', right: 3, top: -5}}>
          </span>
        </div>)}
        className="popup-list"
      >
      <Item extra='字号'><span>Aa-</span>&nbsp;&nbsp;<span>Aa+</span></Item>
      <Item extra='背景'></Item>
      <WingBlank>
      <WhiteSpace size='md'/>
        <Button  size="small" type="primary"
          onClick={() => {
            Popup.hide();
          }}>确定</Button>
        <WhiteSpace size='sm'/>
        <Button  size="small" type="ghost" onClick={() => {
          Toast.info('返回书架...',1.2);
          Popup.hide();
          this.state.dispatch(routerRedux.push('/'));
        }}>返回书架</Button>
        <WhiteSpace size='md'/>
      </WingBlank>
    </List>
    </div>, { animationType: 'slide-up',maskProps, maskClosable: true });
  }

  onClose = () => {
    Popup.hide();
  };

  render(){
    let title = this.props.bookReaderData.title;
    let newText = this.repalceText();
    console.log(this.props);
    return(
      <div className={styles.normal}
        style={{background:`${this.props.bookReaderData.background}`}}
        ref='myReader'>
        <div className={styles.title}>
          <h2>{title}</h2>
        </div>
        {/* 使用dangerouslySetInnerHTML,显示变量的标签内容 */}
        <div className={styles.text}
          style={{fontSize:`${this.props.bookReaderData.fontSize}`}}
          dangerouslySetInnerHTML={{__html: newText}}>
        </div>
        <Pagination mode="number" total={this.state.pages} current={this.state.current} className={styles.pagination} />
      </div>
    );
  }
}


export default BookReader;
