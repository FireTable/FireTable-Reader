import { create,query,_delete,update} from '../services/bookShelf';
import {Toast} from 'antd-mobile';

const TIME = 1.2;

export default {
  namespace: 'bookShelf',
  state: {
    bookList:null
  },
  reducers: {
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
        ...state,
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
      Toast.info('同步成功...', TIME);
      return{...state,
        ...newData,
      };
    },
    //修改失败
    updateFail(state,{payload:newData}){
      Toast.info('同步失败...', TIME);
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
      }else{
        yield put({
          type: 'createFail',
          payload: {}
        });
      }
    },
    //修改资料
    *update({ payload : newData },{ select ,call, put}){
      const oldData = yield select(state => state.user);
      newData = {...oldData,...newData};
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
  },
  subscriptions: {},
};
