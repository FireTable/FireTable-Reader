// request 是我们封装的一个网络请求库
import request from '../utils/request';

const config = require('../config.json');

//``使用连接字符串,request的url
const url_keyword = config.url.queryKeyword;
const url_id = config.url.queryId;

//查询关键字
export async function queryKeyword(params) {
  console.log('queryKeyword_service');
  console.log(params);
    const data =request(`${url_keyword}=${params.keyword}`,
  {
    method: 'GET'
  });
  return data;
}

//查询id
export async function queryId(params) {
  console.log('queryId_service');
  console.log(params);
  const data =request(`${url_id}/${params.id}`,
  {
    method: 'GET'
  });
  return data;
}
