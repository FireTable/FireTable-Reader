import { queryKeyword,queryId} from '../services/bookSearch';

export default {
  namespace: 'bookSearch',
  state: {
    code:null,
    message:null,
    //data为搜索书籍的数组
    data:null,
    loading:null,
    details:null,
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
  },
  effects: {
    //查询关键字相关的书籍
    *queryKeyword({ payload : newData },{ select ,call, put}){
      console.log('queryKeyword_effects');
      console.log(newData);
      const {data} = yield call(() => queryKeyword(newData));
      if (data) {
        console.log('获取数据成功');
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
    //查询id的书籍
    *queryId({ payload : newData },{ select ,call, put}){
      console.log('queryId_effects');
      console.log(newData);
      const {data} = yield call(() => queryId(newData));
      if (data) {
        const temp = {details:data};
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
  },
  subscriptions: {},
};
