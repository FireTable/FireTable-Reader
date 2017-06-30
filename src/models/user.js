import { create,query,update} from '../services/user';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

//本地存储
const store = require('storejs');

const TIME = 1.3;

export default {
  namespace: 'user',
  state: {
    id:null,
    username:null,
    nickname:null,
    icon:null,
    password:null,
  },
  reducers: {
    //保存信息到本地缓存
    saveStore(state,{payload:newData}){
      store(state);
      console.log('saveStore');
      return{
        ...state
      };
    },
    //读取本地缓存
    readStore(state,{payload:newData}){
      const readStoreData = store();
      return{
        ...readStoreData
      };
    },
    //退出登录
    outLogin(state,{payload:newData}){
      Toast.info('退出登录中...', TIME);
      //清空本地存储
      store.clear();
      return{
        id:null,
        username:null,
        nickname:null,
        password:null,
        icon:null,
      };
    },
    //注册成功
    createSuccess(state,{payload:newData}){
      Toast.info('注册成功...', TIME);
      return{...state};
    },
    //注册失败
    createFail(state,{payload:newData}){
      Toast.info('账号已存在，注册失败...', TIME);
      return{...state};
    },
    //登录成功
    querySuccess(state,{payload:newData}){
      Toast.info('登陆中...', TIME);
      return{...state,
        ...newData,
      };
    },
    //登录失败
    queryFail(state,{payload:newData}){
      Toast.info('账号或密码错误，登录失败...', TIME);
      return{...state};
    },
    //修改成功
    updateSuccess(state,{payload:newData}){
      Toast.info('修改成功...', TIME);
      return{...state,
        ...newData,
      };
    },
    //修改失败
    updateFail(state,{payload:newData}){
      Toast.info('修改资料失败...', TIME);
      return{...state};
    },
  },
  effects: {
    //注册
    *create({ payload : newData },{ select ,call, put}){
      newData = {...newData,'nickname':newData.username}
      const {data} = yield call(() => create(newData));
      if (data.state =='success') {
        //注册成功
        yield put({
          type: 'createSuccess',
          payload: {
            ...data
          }
        });
        //添加阅读器配置
        yield put({
          type: 'bookReader/create',
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
    //登录
    *query({ payload : newData },{ select ,call, put}){
      const {data} = yield call(() => query(newData));
      if (data.state =='success') {
        yield put({
          type: 'querySuccess',
          payload: {
            ...data
          }
        });
        //存储到本地
        yield put({
          type: 'saveStore',
          payload: {
            ...data
          }
        });
      }else{
        yield put({
          type: 'queryFail',
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
    //验证登录
    *isLogin({ payload : newData },{ select ,call, put}){
      const userData = yield select(state => state.user);
      if (userData.id == null) {
        Toast.info('登录才能使用哦!', TIME);
        newData.dispatch(routerRedux.push('/'));
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
     history.listen(({ pathname }) => {
       //读取本地数据
       dispatch({
         type: 'user/readStore',
         payload:{}
      });
      if (pathname !== '/') {
      //验证是否登录
        dispatch({
          type: 'user/isLogin',
          payload:{
            dispatch:dispatch
          }
       });
      }
     });
   },
  },
};
