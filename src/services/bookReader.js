// request 是我们封装的一个网络请求库
import request from '../utils/request';

const config = require('../config.json');

//读取配置文件
const url_bookShelf = config.url.bookShelf;
const url_chapter = config.url.queryChapter;
const url_body = config.url.queryBody;
const bookSource = config.url.bookSource;

//params转换为formData,提供给post用
function paramsTOformData(params){
  const formData = new FormData;
  let paramsValue;
  for(let paramsKey in params){
     paramsValue = params[paramsKey];
     formData.append(paramsKey,paramsValue);
  }
  return formData;
}

//创建
export async function create(params) {
  //post需要用formData来传输值,fetch中并没有内置,需要自己创建
  //这里我用了个params转换为formdata的自写方法
  const  formData = paramsTOformData(params);
  const data = request(`${url_bookShelf}`,
  {
    method: 'POST',
    body:formData
  });
  return data;
}

//删除
export async function _delete(params) {
  const data =request(`${url_bookShelf}/${params.id}`,
  {
    method: 'DELETE'
  });

  return data;
}


//更新,patch提交的是json
export async function update(params) {
  console.log(params);
  const data =request(`${url_bookShelf}/${params.id}`,
  {
    method: 'PATCH',//PUT对资源完全替换,PATCH局部替换
    headers: {
    "Content-Type": "application/json",
    },
    body:JSON.stringify(params)
  });

  return data;
}

//查询章节
export async function queryChapter(params) {
  console.log('queryChapter_services');
  console.log(params);
  const data =request(`${url_chapter}/${params.book_id}?view=chapters`,
  {
    method: 'GET'
  });
  return data;
}

//查询正文
export async function queryBody(params) {
  console.log('queryBody');
  console.log(params);
  //进行url编码
  const link = encodeURIComponent(params.link);
  const data =request(`${url_body}=${link}`,
  {
    method: 'GET'
  });
  return data;
}

//查书源
export async function queryBookSource(params) {
  console.log('queryBookSource');
  console.log(params);
  const data =request(`${bookSource}=${params.book_id}`,
  {
    method: 'GET' //必须添加POST/GET请求,否则发送的会是OPTIONS请求,PHP无法获得数据,FETCH的特性
  });
  return data;
}
