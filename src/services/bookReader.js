// request 是我们封装的一个网络请求库
import request from '../utils/request';

const config = require('../config.json');

//读取配置文件的url
const url = config.url.bookShelf;
const test = 'http://novel.juhe.im/chapters/http%3A%2F%2Fvip.zhuishushenqi.com%2Fchapter%2F56f8da09176d03ac1983f6d7%3Fcv%3D1486473051386';

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
  const data = request(`${url}`,
  {
    method: 'POST',
    body:formData
  });
  return data;
}

//删除
export async function _delete(params) {
  const data =request(`${url}/${params.id}`,
  {
    method: 'DELETE'
  });

  return data;
}


//更新,patch提交的是json
export async function update(params) {
  console.log(params);
  const data =request(`${url}/${params.id}`,
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
  const data =request(`${url}/${params.id}`,
  {
    method: 'GET' //必须添加POST/GET请求,否则发送的会是OPTIONS请求,PHP无法获得数据,FETCH的特性
  });
  return data;
}

//查询正文
export async function queryBody(params) {
  const data =request(`${test}`,
  {
    method: 'GET' //必须添加POST/GET请求,否则发送的会是OPTIONS请求,PHP无法获得数据,FETCH的特性
  });
  return data;
}
