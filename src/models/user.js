import { create,query} from '../services/user';
import {Toast} from 'antd-mobile';
import { routerRedux } from 'dva/router';

const TIME = 1.2;

export default {
  namespace: 'user',
  state: {
    id:null,
    username:null,
    nickname:null,
    icon:null,
  },
  reducers: {
    //退出登录
    outLogin(state,{payload:newData}){
      Toast.info('退出登录中...', TIME);
      return{
        id:null,
        username:null,
        nickname:null,
        icon:null,
      };
    },
    //注册成功
    registerSuccess(state,{payload:newData}){
      Toast.info('注册中...', TIME);
      return{...state,
        ...newData,
      };
    },
    //注册失败
    registerFail(state,{payload:newData}){
      Toast.info('账号已存在，注册失败...', TIME);
      return{...state};
    },
    //登录成功
    loginSuccess(state,{payload:newData}){
      Toast.info('登陆中...', TIME);
      return{...state,
        ...newData,
      };
    },
    //登录失败
    loginFail(state,{payload:newData}){
      Toast.info('账号或密码错误，登录失败...', TIME);
      return{...state};
    },
  },
  effects: {
    //注册
    *register({ payload : newData },{ select ,call, put}){
      newData = {...newData,'nickname':newData.username}
      const {data} = yield call(() => create(newData));
      if (data.state =='success') {
        yield put({
          type: 'registerSuccess',
          payload: {
            ...data
          }
        });
      }else{
        yield put({
          type: 'registerFail',
          payload: {}
        });
      }
    },
    //登录
    *login({ payload : newData },{ select ,call, put}){
      const {data} = yield call(() => query(newData));
      if (data.state =='success') {
        yield put({
          type: 'loginSuccess',
          payload: {
            ...data
          }
        });
      }else{
        yield put({
          type: 'loginFail',
          payload: {}
        });
      }
    },
  },
  subscriptions: {},
};
