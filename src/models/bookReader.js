import { queryChapter,queryBody,queryBookSource} from '../services/bookReader';

export default {
  namespace: 'bookReader',
  state: {
    fontSize:24,
    background:'white',
    loading:null,
    text:'',
    title:'',
    chapters:null,
    bookSource:null,
    bookSource_id:0,
    pages : 1,
  },
  reducers: {
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
      const bookSource = yield select(state=>state.bookReader.bookSource);
      console.log(bookSource);
      const bookSource_id = yield select(state=>state.bookReader.bookSource_id);
      console.log(bookSource_id);
      const book_id = bookSource[bookSource_id]._id;
      console.log(book_id);
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
        //再找正文内容
        yield put({
          type: 'queryBody',
          payload: {
            ...data
          }
        });
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
      const link = chapters[book_page].link;
      const newData = { link: link};
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
        //必须触发两次,让页数正常显示
        yield put({
          type: 'queryBodySuccess',
          payload: {
            ...data
          }
        });
      }else{
        console.log('获取数据失败');
        yield put({
          type: 'queryBodyFail',
          payload: {}
        });
      }
    },

  },
  subscriptions: {},
};
