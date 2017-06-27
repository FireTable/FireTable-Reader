import { queryChapter,queryBody} from '../services/bookReader';

export default {
  namespace: 'bookReader',
  state: {
    fontSize:24,
    background:'white',
    loading:null,
    body:null,
    chapterList:null,
  },
  reducers: {
    //查询正文成功
    queryBodySuccess(state,{payload:newData}){
      console.log('queryBodySuccess');
      console.log(newData);
      return{
        ...state,
        body:newData.data.chapter
      };
    },
    //查询正文失败
    queryBodyFail(state,{payload:newData}){
      console.log('queryBodyFail');
      return{
        ...state,
      };
    },
  },
  effects: {
    //查询正文
    *queryBody({ payload : newData },{ select ,call, put}){
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
