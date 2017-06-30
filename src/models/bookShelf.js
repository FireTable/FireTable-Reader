import {create,query,_delete,update} from '../services/bookShelf';
import {Toast} from 'antd-mobile';

const TIME = 1.2;

export default {
  namespace: 'bookShelf',
  state: {
    bookList:null,
    book:null
  },
  reducers: {
    //跳转页
    choosePage(state,{payload:newData}){
      console.log('choosePage_bookShelf');
      console.log(newData);
      state = {...state,book:{...state.book,...newData}};
      console.log(state);
      return{
        ...state
      };
    },
    //上一页
    prePage(state,{payload:newData}){
      console.log('nextPage_model');
      console.log(newData);
      state = {...state,book:{...state.book,...newData}};
      return{
        ...state
      };
    },
    //下一页
    nextPage(state,{payload:newData}){
      console.log('nextPage_model');
      console.log(newData);
      state = {...state,book:{...state.book,...newData}};
      return{
        ...state
      };
    },
    //保存书的信息
    saveBook(state,{payload:newData}){
      console.log('saveBook');
      console.log(newData);
      return{
        ...state,
        book:newData,
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
      Toast.info('添加成功...', TIME);
      return{...state};
    },
    //创建失败
    createFail(state,{payload:newData}){
      Toast.info('书本已存在，添加失败...', TIME);
      return{...state};
    },
    //修改成功
    updateSuccess(state,{payload:newData}){
      return{...state};
    },
    //修改失败
    updateFail(state,{payload:newData}){
      return{...state};
    },
  },
  effects: {
    //查询用户的书籍
    *query({ payload : Data },{ select ,call, put}){
      console.log('query');
      const user_id = yield select(state => state.user.id);
      const newData = {user_id:user_id};
      const {data} = yield call(() => query(newData));
      if (data.state =='success') {
        const temp = { bookList:data };
        console.log('获取数据成功');
        console.log(temp);
        yield put({
          type: 'querySuccess',
          payload: {
            ...temp
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
    //删除书本
    *_delete({ payload : newData },{ select ,call, put}){
      console.log('delete');
      const {data} = yield call(() => _delete(newData));
      if (data.state =='success') {
        console.log('删除数据成功');
        //更新书架数据
        yield put({
          type: 'query',
          payload: {}
        });
      }else{
        console.log('获取数据失败');
        yield put({
          type: 'query',
          payload: {}
        });
      }
    },
    //添加书本
    *create({ payload : newData },{ select ,call, put}){
      const user_id = yield select(state=>state.user.id);
      newData = {...newData,'user_id':user_id};
      const {data} = yield call(() => create(newData));
      console.log(data);
      if (data.state =='success') {
        yield put({
          type: 'createSuccess',
          payload: {
            ...data
          }
        });
        //清空search缓存的书本数据
        yield put({
          type: 'bookSearch/removeDetails',
          payload: {}
        });
      }else{
        yield put({
          type: 'createFail',
          payload: {}
        });
      }
    },
    //修改书看到第几页
    *update({ payload : newData },{ select ,call, put}){
      const bookData = yield select(state => state.bookShelf.book);
      console.log('bookData');
      console.log(bookData);
      const {data} = yield call(() => update(bookData));
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
  },
  subscriptions: {
    setup({ dispatch, history }) {
     history.listen(({ pathname }) => {
       if (pathname === '/') {
         console.log('查询书架');
         //查询暑假
         dispatch({
           type: 'bookShelf/query',
           payload:{}
        });
        //清空阅读器
        dispatch({
          type: 'bookReader/resetReader',
          payload:{}
       });
       }
     });
   },
  },
};
