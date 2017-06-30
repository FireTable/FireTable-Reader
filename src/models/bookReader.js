import {queryChapter,queryBody,queryBookSource,create,query,update} from '../services/bookReader';
import {Toast} from 'antd-mobile';

const TIME = 1.2;

export default {
  namespace: 'bookReader',
  state: {
    id:null,
    fontSize:30,
    background:'#f5f5f9',
    loading:null,
    text:'',
    title:'',
    chapters:null,
    bookSource:null,
    bookSource_id:0,
  },
  reducers: {
    //清空阅读器
    resetReader(state,{payload:newData}){
      return{
        id:null,
        fontSize:30,
        background:'#f5f5f9',
        loading:null,
        text:'',
        title:'',
        chapters:null,
        bookSource:null,
        bookSource_id:0,
      };
    },
    //查询成功
    querySuccess(state,{payload:newData}){
      console.log('querySuccess');
      console.log(newData);
      return{
        ...state,
        ...newData,
      };
    },
    //查询失败
    queryFail(state,{payload:newData}){
      console.log('queryFail');
      return{
        bookList:null
      };
    },
    //创建成功
    createSuccess(state,{payload:newData}){
      return{...state};
    },
    //创建失败
    createFail(state,{payload:newData}){
      return{...state};
    },
    //修改成功
    updateSuccess(state,{payload:newData}){
      return{
        ...state,
        ...newData,
      };
    },
    //修改失败
    updateFail(state,{payload:newData}){
      return{...state};
    },
    //重置书源
    resetBookSource(state,{payload:newData}){
      return{
        ...state,
        bookSource_id:0,
      };
    },
    //自动更换书源
    changeBookSource(state,{payload:newData}){
      console.log('changeBookSource');
      console.log(state);
      const MAX = Object.keys(state.bookSource).length-1;
      if(state.bookSource_id < MAX){
        state.bookSource_id++;
      }
      return{
        ...state,
      };
    },
    //查询书源成功
    queryBookSourceSuccess(state,{payload:newData}){
      console.log('queryBookSourceSuccess');
      console.log(newData);
      return{
        ...state,
        bookSource:newData
      };
    },
    //查询书源失败
    queryBookSourceFail(state,{payload:newData}){
      console.log('queryBookSourceFail');
      return{
        ...state,
      };
    },
    //查询正文成功
    queryBodySuccess(state,{payload:newData}){
      console.log('queryBodySuccess');
      console.log(newData);
      //部分小说为body
      if(!newData.chapter.cpContent){
        newData = {...newData,chapter:{
          cpContent:newData.chapter.body,
          title:newData.chapter.title,
        }};
      }
      return{
        ...state,
        text:newData.chapter.cpContent,
        title:newData.chapter.title
      };
    },
    //查询正文失败
    queryBodyFail(state,{payload:newData}){
      console.log('queryBodyFail');
      return{
        ...state,
        text:''
      };
    },
    //查询章节成功
    queryChapterSuccess(state,{payload:newData}){
      console.log('queryChapterSuccess');
      console.log(newData);
      return{
        ...state,
        chapters:newData.chapters
      };
    },
    //查询章节失败
    queryChapterFail(state,{payload:newData}){
      console.log('queryChapterFail');
      return{
        ...state,
      };
    },
  },
  effects: {
    //查询阅读器配置
    *query({ payload : Data },{ select ,call, put}){
      console.log('query');
      const user_id = yield select(state => state.user.id);
      const newData = {user_id:user_id};
      const {data} = yield call(() => query(newData));
      if (data.state =='success') {
        console.log('获取数据成功');
        console.log(data);
        yield put({
          type: 'querySuccess',
          payload: {
            ...data
          }
        });
      }else{
        console.log('获取数据失败');
        yield put({
          type: 'queryFail',
          payload: {}
        });
      }
    },
    //添加新的阅读器配置
    *create({ payload : newData },{ select ,call, put}){
      newData = {...newData,'user_id':newData.id};
      const {data} = yield call(() => create(newData));
      console.log(data);
      if (data.state =='success') {
        yield put({
          type: 'createSuccess',
          payload: {
            ...data
          }
        });
      }else{
        yield put({
          type: 'createFail',
          payload: {}
        });
      }
    },
    //修改阅读器配置
    *update({ payload : newData },{ select ,call, put}){
      console.log('update');
      console.log('newData');
      console.log(newData);
      const {data} = yield call(() => update(newData));
      if (data.state =='success') {
        yield put({
          type: 'updateSuccess',
          payload: {
            ...data
          }
        });
      }else{
        yield put({
          type: 'updateFail',
          payload: {}
        });
      }
    },
    //打开阅读器
    *loadData({ payload : oldData },{ select ,call, put}){
      //找书源
      yield put({
        type: 'queryBookSource',
        payload: {}
      });
    },
    //找书源
    *queryBookSource({ payload : oldData },{ select ,call, put}){
      console.log('找书源');
      const user_id = yield select(state=>state.user.id);
      const book_id = yield select(state=>state.bookShelf.book.book_id);
      const newData = {book_id:book_id};
      const {data} = yield call(() => queryBookSource(newData));
      if (data) {
        console.log('获取书源成功');
        console.log(data);
        yield put({
          type: 'queryBookSourceSuccess',
          payload: {
            ...data
          }
        });
        //找查询章节
        yield put({
          type: 'queryChapter',
          payload: {}
        });
      }else{
        console.log('获取数据失败');
        yield put({
          type: 'queryBookSourceFail',
          payload: {}
        });
      }
    },
    //查询章节
    *queryChapter({ payload : oldData },{ select ,call, put}){
      console.log('queryChapter');
      const text = yield select(state=>state.bookReader.text);
      const bookSource = yield select(state=>state.bookReader.bookSource);
      const bookSource_id = yield select(state=>state.bookReader.bookSource_id);
      const book_id = bookSource[bookSource_id]._id;
      const newData = {book_id:book_id};
      console.log('queryChapter_effects');
      console.log(newData);
      const {data} = yield call(() => queryChapter(newData));
      if (data) {
        console.log('获取数据成功');
        console.log(data);
        yield put({
          type: 'queryChapterSuccess',
          payload: {
            ...data
          }
        });
        if(text == '' ){
          //如果第一次打开没正文,再找正文内容
          yield put({
            type: 'queryBody',
            payload: {}
          });
        }
      }else{
        console.log('获取数据失败');
        yield put({
          type: 'queryChapterFail',
          payload: {}
        });
      }
    },
    //查询正文
    *queryBody({ payload : oldData },{ select ,call, put}){
      let book_page = yield select(state=>state.bookShelf.book.book_page);
      const chapters = yield select(state=>state.bookReader.chapters);
      //页码空,设为0
      if(book_page == null){
        book_page = 0 ;
      }
      let link = chapters[book_page].link;
      let newData = { link: link};
      console.log('queryBody_effects');
      console.log(newData);
      const {data} = yield call(() => queryBody(newData));
      if (data) {
        console.log('获取数据成功');
        console.log(data);
        yield put({
          type: 'queryBodySuccess',
          payload: {
            ...data
          }
        });
        //重置书源id,并且重新获取章节
        yield put({
          type: 'resetBookSource',
          payload: {}
        });
        yield put({
          type: 'queryChapter',
          payload: {}
        });
      }else{
        console.log('获取数据失败');
        console.log(data);
        Toast.info('更换书源中...',TIME);
        yield put({
          type: 'queryBodyFail',
          payload: {}
        });
        //自动更换书源
        yield put({
          type: 'changeBookSource',
          payload: {}
        });
        //重新查询章节和书
        yield put({
          type: 'queryChapter',
          payload: {}
        });
      }
    },
    //下一页
    *nextPage({ payload : oldData },{ select ,call, put}){
      let book_page = yield select(state=>state.bookShelf.book.book_page);
      const chapters = yield select(state=>state.bookReader.chapters);
      const MAX_PAGE = chapters.length;
      console.log(MAX_PAGE);
      console.log(book_page);
      //页码空,设为0
      if(book_page == null){
        book_page = 0 ;
      }
      book_page++;
      if( book_page != MAX_PAGE){
        Toast.info('下一章', TIME);
        //改变页码
        yield put({
          type: 'bookShelf/nextPage',
          payload:{
            "book_page" : book_page
          }
        });
        //查询正文
        yield put({
          type: 'queryBody',
          payload:{}
        });
        //保存页码
        yield put({
          type: 'bookShelf/update',
          payload:{}
        });
      }else{
        Toast.info('没有下一章啦...', TIME);
      }
    },
    //上一页
    *prePage({ payload : oldData },{ select ,call, put}){
      let book_page = yield select(state=>state.bookShelf.book.book_page);
      //页码空,设为0
      if(book_page == null){
        book_page = 0 ;
      }
      if(book_page != 0){
        book_page--;
        Toast.info('上一章', TIME);
        //上一页,改变页码
        yield put({
          type: 'bookShelf/prePage',
          payload:{
            "book_page" : book_page
          }
        });
        //查询正文
        yield put({
          type: 'queryBody',
          payload:{}
        });
        //保存页码
        yield put({
          type: 'bookShelf/update',
          payload:{}
        });
      }else{
        Toast.info('没有上一章啦...', TIME);
      }
    },
    //跳转页
    *choosePage({ payload : newData },{ select ,call, put}){
      Toast.info('章节跳转中...', TIME);
      console.log('章节跳转中...');
      console.log(newData);
        yield put({
          type: 'bookShelf/choosePage',
          payload:{
            ...newData
          }
        });
        //查询正文
        yield put({
          type: 'queryBody',
          payload:{}
        });
        //保存页码
        yield put({
          type: 'bookShelf/update',
          payload:{}
        });

    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
     history.listen(({ pathname }) => {
       if (pathname === '/bookReader') {
         console.log('查询阅读器配置');
         dispatch({
           type: 'bookReader/query',
           payload:{}
        });
       }
     });
   },
  },
};
