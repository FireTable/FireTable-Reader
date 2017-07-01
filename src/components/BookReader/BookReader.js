import React from 'react';
import styles from './BookReader.css';
import {Pagination,Popup,List,Accordion,Button,WhiteSpace,WingBlank,Toast,Icon,Drawer,ActivityIndicator} from 'antd-mobile';
import {routerRedux} from 'dva/router';
import touch from 'touchjs';
import _ from 'lodash';

const config = require('../../config.json');
let colorList = config.color;
const LENGTH_CHAPTER = config.length.chapter;

console.log('color');
console.log(colorList);

colorList =  _.toPairs(colorList);

console.log(colorList);

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
      dispatch:bookReaderData.dispatch,
      open: false,
      position: 'left',
      loading:false,
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

  //跳转选定章
  choosePage(page){
    window.scrollTo(0,0);
    console.log('choosePage');
    this.state.dispatch({
      type: 'bookReader/choosePage',
      payload:{
        book_page:page
      }
   });
  }

  //手势事件
  touchEvent(myReaderDOM){
    //按住
    touch.on(myReaderDOM,'hold',()=>this.openFunctionBar());
    //滑动
    touch.on(myReaderDOM,'doubletap',(ev)=>{
      console.log(ev);
      let direction = null;
      const x = ev.detail.position.x;
      if(x < window.innerWidth/2){
        direction = 'left';
      }else{
        direction = 'right';
      }
      switch (direction) {
        case 'left' :
          this.prePage();
          break;
        case 'right' :
          this.nextPage();
          break;
      }
    });
  }

  //获取页码
  getPages(){
    console.log('getPages');
    const myReaderDOM = this.refs.myReader;
    let pages = Math.ceil(parseInt(myReaderDOM.scrollHeight)/parseInt(window.innerHeight));
    console.log(myReaderDOM.scrollHeight);
    this.setState({
      current : 0,
      pages : pages,
    });
  }

  //转换转义字符
  repalceText(){
    let text = '' + this.props.bookReaderData.text;
    //替换字符串,将/n换成换行,以及添加段落头
    let newText = _.replace(text, new RegExp('\n',"gm"), '<br/>');
    return newText;
  }

  //浏览器滚动事件
  handleScroll() {
    //获取当前位置
    const nowHeight = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
    const current = Math.ceil(parseInt(nowHeight)/parseInt(window.innerHeight));
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
  componentWillReceiveProps(nextProps){
    //页数
    this.getPages();
    this.state = {
      loading:nextProps.bookReaderData.loading,
      dispatch:nextProps.bookReaderData.dispatch,
    };
  }

  //更改样式
  updateStyles(type,value){
    const bookReaderData = this.props.bookReaderData;
    console.log('updateStyles');
    console.log(value);
    let newData = {
      id:bookReaderData.id,
      fontSize:bookReaderData.fontSize,
      background:bookReaderData.background
    };
    switch (type) {
      case 'fontSizeAdd':
        newData.fontSize++;
        break;
      case 'fontSizeMinus':
        newData.fontSize--;
        break;
      case 'background':
        newData.background = value;
        break;
    }
    console.log(newData);
    this.state.dispatch({
      type: 'bookReader/update',
      payload:{
        ...newData
      }
   });
  }

  //打开功能栏
  openFunctionBar(){
    const ColorDiv = colorList.map(color =>{
        return(
          <span>
            <div className={styles.color}
                 style={{background:`${color[1]}`}}
                 onClick={()=>this.updateStyles('background',`${color[1]}`)}
                 ></div>
            &nbsp;
          </span>
        );
      });
    Popup.show(
      <div>
      <List renderHeader={() => (
        <div style={{ position: 'relative' }}>
          控制面板
          <span style={{position: 'absolute', right: 3, top: -4.5}}
            onClick={() => {
              this.onOpenChange();
              Popup.hide();
            }}>
            <Icon type={require('!svg-sprite!../../assets/icon/ellipsis.svg')}
                  style={{position: 'absolute', right: 1}}
            />
          </span>
        </div>)}
      >
      <Item extra='字号'>
        <div className={styles.font}
             onClick={()=>this.updateStyles('fontSizeMinus','fontSizeMinus')}
             >Aa-</div>
        &nbsp;
        <div className={styles.font}
             onClick={()=>this.updateStyles('fontSizeAdd','fontSizeAdd')}
          >Aa+</div>
      </Item>
      <Item extra='背景'>
        {ColorDiv}
      </Item>
      <WingBlank>
      <WhiteSpace size='md'/>
        <Button  size="small" type="primary"
          onClick={() => {
            Popup.hide();
          }}>继续阅读</Button>
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

  //弹出层关闭
  onClose = () => {
    Popup.hide();
  };

  //打开or关闭抽屉的函数
  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  }

  //获取抽屉内容
  drawerContent(){
    const chapterList = this.props.bookReaderData.chapters;
    let sidebar = '暂无数据';
    if(chapterList!=null){
    const maxLength = chapterList.length;
    const sidebarContent = chapterList.map((chapter, index) => {
      return (
        <Item key={index} onClick={()=>{
          this.onOpenChange();
          setTimeout('',500);
          this.choosePage(`${index}`);
        }}
        >{chapter.title.substr(0,LENGTH_CHAPTER)}</Item>
      );
    });
      sidebar =(
      <div>
        <List>
          <Item>章节列表</Item>
          {sidebarContent}
        </List>
      </div>
    );
  }

     const drawerProps = {
       open: this.state.open,
       position: this.state.position,
       onOpenChange:this.onOpenChange,
     };
     return (
       <div>
        <Drawer
          style={{
            minHeight: window.innerHeight-200,
            maxHeight: window.innerHeight,
            bottom:0,
            position:'fixed',
            overflow:'auto',
           }}
          touch
          dragHandleStyle={{ display: 'none' }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          sidebar={sidebar}
          {...drawerProps}
        >
        </Drawer>
      </div>);
    }


  render(){
    //抽屉中的内容,引用函数
    const DrawerComponent = this.drawerContent();
    //正文部分处理
    let title = this.props.bookReaderData.title;
    let newText = this.repalceText();
    console.log(this.props);
    return(
      <div className={styles.normal}
        style={{background:`${this.props.bookReaderData.background}`}}
        ref='myReader'>
          <ActivityIndicator toast text="正在加载" animating={this.state.loading} />
        <div className={styles.title}>
          <h2>{title}</h2>
        </div>
        {/* 使用dangerouslySetInnerHTML,显示变量的标签内容 */}
        <div className={styles.text}
          style={{fontSize:`${this.props.bookReaderData.fontSize}`}}
          dangerouslySetInnerHTML={{__html: newText}}>
        </div>
        <Pagination mode="number" total={this.state.pages} current={this.state.current} className={styles.pagination} />
        {DrawerComponent}

      </div>
    );
  }
}


export default BookReader;
